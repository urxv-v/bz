import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useSyncExternalStore,
} from 'react';

export interface TelemetryEvent {
  schema_version?: number;
  event_id?: string;
  experiment_id: number;
  device_id?: string;
  timestamp: string;
  sequence?: number;
  measurements: Record<string, number>;
  quality?: string;
}

export interface TelemetrySnapshot {
  status: 'connecting' | 'live' | 'reconnecting' | 'offline';
  lastEvent: TelemetryEvent | null;
  history: Record<string, number[]>;
  lastReceivedAt: number | null;
}

const EMPTY_SNAPSHOT: TelemetrySnapshot = {
  status: 'offline',
  lastEvent: null,
  history: {},
  lastReceivedAt: null,
};

class TelemetryStore {
  private snapshots = new Map<number, TelemetrySnapshot>();
  private listeners = new Map<number, Set<() => void>>();
  private sockets = new Map<number, WebSocket>();
  private reconnectTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private disconnectTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private lastConnectAttempt = new Map<number, number>();

  // Cooldown interval between reconnection attempts to prevent request storms
  private readonly MIN_RECONNECT_INTERVAL_MS = 3000;
  // Grace period before tearing down the socket on unmount (handles fast view toggles / StrictMode)
  private readonly TEARDOWN_GRACE_PERIOD_MS = 1000;

  getSnapshot(experimentId: number): TelemetrySnapshot {
    return this.snapshots.get(experimentId) || EMPTY_SNAPSHOT;
  }

  subscribe(experimentId: number, listener: () => void): () => void {
    // If a teardown timer was pending from a recent unmount, cancel it immediately
    const pendingDisconnect = this.disconnectTimers.get(experimentId);
    if (pendingDisconnect !== undefined) {
      window.clearTimeout(pendingDisconnect);
      this.disconnectTimers.delete(experimentId);
    }

    let listeners = this.listeners.get(experimentId);
    if (!listeners) {
      listeners = new Set();
      this.listeners.set(experimentId, listeners);
    }
    listeners.add(listener);

    // Schedule connection if not already running or connecting
    this.scheduleConnect(experimentId, false);

    return () => {
      listeners?.delete(listener);
      if (listeners?.size === 0) {
        this.listeners.delete(experimentId);

        // Defer physical socket close to avoid churn during fast route changes or React StrictMode
        const timer = window.setTimeout(() => {
          this.teardown(experimentId);
          this.disconnectTimers.delete(experimentId);
        }, this.TEARDOWN_GRACE_PERIOD_MS);

        this.disconnectTimers.set(experimentId, timer);
      }
    };
  }

  private setSnapshot(experimentId: number, snapshot: TelemetrySnapshot) {
    this.snapshots.set(experimentId, snapshot);
    this.listeners.get(experimentId)?.forEach((listener) => listener());
  }

  private scheduleConnect(experimentId: number, isRetry: boolean) {
    if (this.reconnectTimers.has(experimentId)) return;

    const existingSocket = this.sockets.get(experimentId);
    if (
      existingSocket &&
      (existingSocket.readyState === WebSocket.CONNECTING ||
        existingSocket.readyState === WebSocket.OPEN)
    ) {
      return;
    }

    const lastAttempt = this.lastConnectAttempt.get(experimentId) ?? 0;
    const elapsed = Date.now() - lastAttempt;
    const delay = isRetry
      ? Math.max(0, this.MIN_RECONNECT_INTERVAL_MS - elapsed)
      : 0;

    const timer = window.setTimeout(() => {
      this.reconnectTimers.delete(experimentId);
      this.executeConnect(experimentId);
    }, delay);

    this.reconnectTimers.set(experimentId, timer);
  }

  private executeConnect(experimentId: number) {
    if (!this.listeners.get(experimentId)?.size) return;

    this.lastConnectAttempt.set(experimentId, Date.now());

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const token = localStorage.getItem('blazecore_token');
    const query = token ? `?access_token=${encodeURIComponent(token)}` : '';
    const socket = new WebSocket(
      `${protocol}//${window.location.host}/api/v1/experiments/${experimentId}/stream${query}`
    );

    this.sockets.set(experimentId, socket);
    this.setSnapshot(experimentId, {
      ...this.getSnapshot(experimentId),
      status: 'connecting',
    });

    socket.onopen = () => {
      this.setSnapshot(experimentId, {
        ...this.getSnapshot(experimentId),
        status: 'live',
      });
    };

    socket.onmessage = (event) => {
      try {
        const telemetry = JSON.parse(event.data) as TelemetryEvent;
        if (
          telemetry.experiment_id !== experimentId ||
          !telemetry.timestamp ||
          !telemetry.measurements
        ) {
          return;
        }

        const current = this.getSnapshot(experimentId);
        const history = { ...current.history };
        Object.entries(telemetry.measurements).forEach(([name, value]) => {
          if (!Number.isFinite(value)) return;
          history[name] = [...(history[name] || []), value].slice(-30);
        });

        this.setSnapshot(experimentId, {
          status: 'live',
          lastEvent: telemetry,
          history,
          lastReceivedAt: Date.now(),
        });
      } catch {
        // Drop malformed frame; the backend remains responsible for validation
      }
    };

    // The browser automatically emits onclose after onerror; do not force socket.close() here
    socket.onerror = () => { };

    socket.onclose = () => {
      this.sockets.delete(experimentId);

      // If subscribers unsubscribed while socket was closing, mark offline and stop
      if (!this.listeners.get(experimentId)?.size) {
        this.setSnapshot(experimentId, {
          ...this.getSnapshot(experimentId),
          status: 'offline',
        });
        return;
      }

      this.setSnapshot(experimentId, {
        ...this.getSnapshot(experimentId),
        status: 'reconnecting',
      });

      this.scheduleConnect(experimentId, true);
    };
  }

  private teardown(experimentId: number) {
    const reconnectTimer = this.reconnectTimers.get(experimentId);
    if (reconnectTimer !== undefined) {
      window.clearTimeout(reconnectTimer);
      this.reconnectTimers.delete(experimentId);
    }

    const socket = this.sockets.get(experimentId);
    if (socket) {
      // Clear onclose handler before closing to prevent triggering reconnection logic
      socket.onclose = null;
      socket.close();
      this.sockets.delete(experimentId);
    }

    const current = this.snapshots.get(experimentId);
    if (current) {
      this.setSnapshot(experimentId, { ...current, status: 'offline' });
    }
  }
}

const TelemetryContext = createContext<TelemetryStore | null>(null);

export const TelemetryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useRef(new TelemetryStore()).current;
  return <TelemetryContext.Provider value={store}>{children}</TelemetryContext.Provider>;
};

export function useTelemetry(experimentId: number): TelemetrySnapshot {
  const store = useContext(TelemetryContext);
  if (!store) throw new Error('useTelemetry must be used inside TelemetryProvider');

  const subscribe = useCallback(
    (listener: () => void) => store.subscribe(experimentId, listener),
    [store, experimentId],
  );

  const getSnapshot = useCallback(
    () => store.getSnapshot(experimentId),
    [store, experimentId],
  );

  const getServerSnapshot = useCallback(() => EMPTY_SNAPSHOT, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function metric(snapshot: TelemetrySnapshot, name: string, fallback: number): number {
  return snapshot.lastEvent?.measurements[name] ?? fallback;
}
