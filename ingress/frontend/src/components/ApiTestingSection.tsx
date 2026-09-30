import React, { useEffect, useRef, useState } from 'react';
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Terminal,
  Copy,
  Play,
  Plus,
  Trash2,
  X,
  Plug,
  Radio
} from 'lucide-react';

interface ApiTest {
  method: string;
  endpoint: string;
  body?: string;
  headers?: Record<string, string>;
  response: string;
  status: 'success' | 'error' | 'pending';
  timestamp: string;
}

interface SavedEndpoint {
  id: string;
  name: string;
  method: string;
  endpoint: string;
  body?: string;
  headers?: Record<string, string>;
}

type WsStatus = 'idle' | 'connecting' | 'open' | 'closed';
type WsKind = 'connected' | 'gap' | 'telemetry' | 'error' | 'raw';

interface WsEntry {
  id: number;
  kind: WsKind;
  text: string;
  time: string;
}

const WS_KIND_COLORS: Record<WsKind, string> = {
  connected: '#dbeafe',
  gap: '#fef3c7',
  telemetry: '#d1fae5',
  error: '#fee2e2',
  raw: 'rgba(148, 163, 184, 0.15)',
};

const WS_STATUS_STYLES: Record<WsStatus, { background: string; color: string }> = {
  idle: { background: '#e5e7eb', color: '#374151' },
  connecting: { background: '#fef3c7', color: '#92400e' },
  open: { background: '#d1fae5', color: '#065f46' },
  closed: { background: '#fee2e2', color: '#991b1b' },
};

const MAX_WS_ENTRIES = 500;

const ApiTestingSection: React.FC = () => {
  const [mode, setMode] = useState<'http' | 'ws'>('http');

  /* ───────── HTTP state (unchanged) ───────── */
  const [tests, setTests] = useState<ApiTest[]>([]);
  const [savedEndpoints, setSavedEndpoints] = useState<SavedEndpoint[]>([
    { id: '1', name: 'Get All Experiments', method: 'GET', endpoint: '/api/v1/experiments/get/all', body: '', headers: {} },
    { id: '2', name: 'Get Experiment by Name', method: 'GET', endpoint: '/api/v1/experiments/get/{name}', body: '', headers: {} },
    { id: '3', name: 'Create Experiment', method: 'POST', endpoint: '/api/v1/experiments/create', body: '{"name": "New Test Experiment", "status": "PENDING"}', headers: {} },
    { id: '4', name: 'Update Experiment', method: 'PUT', endpoint: '/api/v1/experiments/update', body: '{"id": 1, "name": "Updated Experiment", "status": "DONE"}', headers: {} },
    { id: '5', name: 'Delete Experiment', method: 'DELETE', endpoint: '/api/v1/experiments/delete/{name}', body: '', headers: {} },
  ]);
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [customEndpoint, setCustomEndpoint] = useState('/api/v1/experiments/get/all');
  const [requestBody, setRequestBody] = useState('');
  const [customHeaders, setCustomHeaders] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [endpointName, setEndpointName] = useState('');
  const [selectedSavedEndpoint, setSelectedSavedEndpoint] = useState<string | null>(null);

  /* ───────── WebSocket state ───────── */
  const [wsUrlTemplate, setWsUrlTemplate] = useState('ws://localhost:8080/ws/telemetry/{experiment_id}');
  const [wsExperimentId, setWsExperimentId] = useState('1');
  const [wsToken, setWsToken] = useState('');
  const [wsStatus, setWsStatus] = useState<WsStatus>('idle');
  const [wsEntries, setWsEntries] = useState<WsEntry[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const wsLogRef = useRef<HTMLDivElement>(null);
  const wsIdRef = useRef(0);

  const wsLive = wsStatus === 'open' || wsStatus === 'connecting';

  const addWsEntry = (kind: WsKind, text: string) => {
    setWsEntries(prev =>
      [...prev, { id: ++wsIdRef.current, kind, text, time: new Date().toLocaleTimeString() }].slice(-MAX_WS_ENTRIES)
    );
  };

  const buildWsUrl = () => {
    let url = wsUrlTemplate.trim().replace('{experiment_id}', encodeURIComponent(wsExperimentId.trim()));
    if (wsToken.trim()) {
      url += (url.includes('?') ? '&' : '?') + 'access_token=' + encodeURIComponent(wsToken.trim());
    }
    return url;
  };

  const connectWs = () => {
    if (wsRef.current) return;
    const url = buildWsUrl();
    setWsStatus('connecting');
    addWsEntry('raw', 'Connecting to ' + url.replace(/access_token=[^&]+/, 'access_token=***'));

    let socket: WebSocket;
    try {
      socket = new WebSocket(url);
    } catch (e) {
      setWsStatus('closed');
      addWsEntry('error', 'Failed to create WebSocket: ' + (e instanceof Error ? e.message : String(e)));
      return;
    }
    wsRef.current = socket;

    socket.onopen = () => setWsStatus('open');

    socket.onmessage = (event) => {
      let kind: WsKind = 'raw';
      let text = String(event.data);
      try {
        const parsed = JSON.parse(text);
        if (parsed.type === 'connected') kind = 'connected';
        else if (parsed.type === 'gap') kind = 'gap';
        else kind = 'telemetry';
        text = JSON.stringify(parsed, null, 2);
      } catch {
        // not JSON, show raw
      }
      addWsEntry(kind, text);
    };

    socket.onerror = () => {
      addWsEntry('error', 'WebSocket error. Browsers hide the real reason; check the server logs or the Network tab for the close code / HTTP status.');
    };

    socket.onclose = (event) => {
      wsRef.current = null;
      setWsStatus('closed');
      addWsEntry('raw', `Closed: code=${event.code} reason=${event.reason || '(none)'}`);
    };
  };

  const disconnectWs = () => {
    wsRef.current?.close(1000, 'manual disconnect');
  };

  const clearWsLog = () => setWsEntries([]);

  // Close the socket if the component unmounts
  useEffect(() => {
    return () => {
      wsRef.current?.close(1000, 'unmounted');
    };
  }, []);

  // Keep the log scrolled to the newest message
  useEffect(() => {
    if (wsLogRef.current) {
      wsLogRef.current.scrollTop = wsLogRef.current.scrollHeight;
    }
  }, [wsEntries]);

  /* ───────── HTTP handlers (unchanged) ───────── */
  const executeApiCall = async () => {
    setIsLoading(true);

    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (customHeaders) {
      try {
        const headerLines = customHeaders.split('\n');
        headerLines.forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            headers[key.trim()] = valueParts.join(':').trim();
          }
        });
      } catch (e) {
        console.error('Error parsing headers:', e);
      }
    }

    const test: ApiTest = {
      method: selectedMethod,
      endpoint: customEndpoint,
      body: requestBody,
      headers,
      response: '',
      status: 'pending',
      timestamp: new Date().toLocaleTimeString()
    };

    try {
      const url = `http://localhost:8001${customEndpoint}`;
      const options: RequestInit = {
        method: selectedMethod,
        headers,
      };

      if (requestBody && (selectedMethod === 'POST' || selectedMethod === 'PUT')) {
        options.body = requestBody;
      }

      const response = await fetch(url, options);
      const data = await response.text();

      test.response = data;
      test.status = response.ok ? 'success' : 'error';
    } catch (error) {
      test.response = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      test.status = 'error';
    }

    setTests(prev => [test, ...prev].slice(0, 10));
    setIsLoading(false);
  };

  const loadSavedEndpoint = (saved: SavedEndpoint) => {
    setSelectedMethod(saved.method);
    setCustomEndpoint(saved.endpoint);
    setRequestBody(saved.body || '');
    setCustomHeaders(saved.headers ? Object.entries(saved.headers).map(([k, v]) => `${k}: ${v}`).join('\n') : '');
    setSelectedSavedEndpoint(saved.id);
  };

  const saveEndpoint = () => {
    if (!endpointName.trim()) return;

    let headers: Record<string, string> = {};
    if (customHeaders) {
      try {
        const headerLines = customHeaders.split('\n');
        headerLines.forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            headers[key.trim()] = valueParts.join(':').trim();
          }
        });
      } catch (e) {
        console.error('Error parsing headers:', e);
      }
    }

    const newEndpoint: SavedEndpoint = {
      id: Date.now().toString(),
      name: endpointName,
      method: selectedMethod,
      endpoint: customEndpoint,
      body: requestBody,
      headers,
    };

    setSavedEndpoints(prev => [...prev, newEndpoint]);
    setShowSaveDialog(false);
    setEndpointName('');
  };

  const deleteSavedEndpoint = (id: string) => {
    setSavedEndpoints(prev => prev.filter(e => e.id !== id));
    if (selectedSavedEndpoint === id) {
      setSelectedSavedEndpoint(null);
    }
  };

  const clearTests = () => {
    setTests([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  /* ───────── Render ───────── */
  const modeButtonStyle = (active: boolean): React.CSSProperties =>
    active ? { boxShadow: 'inset 0 0 0 2px rgb(192, 57, 43)' } : {};

  return (
    <div className="api-testing-section">
      <div className="section-header">
        <h1 className="section-title">API Testing</h1>
        <div className="section-actions">
          <button
            className="action-button secondary"
            style={modeButtonStyle(mode === 'http')}
            onClick={() => setMode('http')}
          >
            <Terminal size={16} />
            <span>HTTP</span>
          </button>
          <button
            className="action-button secondary"
            style={modeButtonStyle(mode === 'ws')}
            onClick={() => setMode('ws')}
          >
            <Radio size={16} />
            <span>WebSocket</span>
          </button>

          {mode === 'http' ? (
            <>
              <button className="action-button secondary" onClick={clearTests}>
                <Trash2 size={16} />
                <span>Clear</span>
              </button>
              <button className="action-button primary" onClick={executeApiCall} disabled={isLoading}>
                {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                <span>{isLoading ? 'Testing...' : 'Execute'}</span>
              </button>
            </>
          ) : (
            <>
              <button className="action-button secondary" onClick={clearWsLog}>
                <Trash2 size={16} />
                <span>Clear</span>
              </button>
              {wsLive ? (
                <button className="action-button primary" onClick={disconnectWs}>
                  <XCircle size={16} />
                  <span>Disconnect</span>
                </button>
              ) : (
                <button className="action-button primary" onClick={connectWs}>
                  <Plug size={16} />
                  <span>Connect</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {mode === 'http' && (
        <div className="api-testing-grid">
          {/* Request Builder */}
          <div className="request-builder">
            <h3>Request Builder</h3>

            <div className="method-selector">
              <label>Method:</label>
              <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            <div className="endpoint-selector">
              <label>Endpoint:</label>
              <input
                type="text"
                value={customEndpoint}
                onChange={(e) => setCustomEndpoint(e.target.value)}
                placeholder="/api/v1/endpoint"
              />
            </div>

            <div className="headers-input">
              <label>Headers (one per line, format: Key: Value):</label>
              <textarea
                value={customHeaders}
                onChange={(e) => setCustomHeaders(e.target.value)}
                placeholder={'Authorization: Bearer token\nContent-Type: application/json'}
                rows={3}
              />
            </div>

            {(selectedMethod === 'POST' || selectedMethod === 'PUT') && (
              <div className="body-input">
                <label>Request Body (JSON):</label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder='{"name": "Example", "status": "PENDING"}'
                  rows={4}
                />
              </div>
            )}

            <div className="saved-endpoints">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4>Saved Endpoints:</h4>
                <button className="action-button secondary" onClick={() => setShowSaveDialog(true)}>
                  <Plus size={14} />
                  <span>Save Current</span>
                </button>
              </div>
              <div className="saved-endpoints-list">
                {savedEndpoints.map((saved) => (
                  <div
                    key={saved.id}
                    className={`saved-endpoint-item ${selectedSavedEndpoint === saved.id ? 'active' : ''}`}
                    onClick={() => loadSavedEndpoint(saved)}
                  >
                    <div className="saved-endpoint-info">
                      <span className={`method-badge ${saved.method.toLowerCase()}`}>{saved.method}</span>
                      <span className="endpoint-name">{saved.name}</span>
                      <span className="endpoint-path">{saved.endpoint}</span>
                    </div>
                    <button
                      className="delete-endpoint-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSavedEndpoint(saved.id);
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Response Display */}
          <div className="response-display">
            <h3>Response History</h3>

            {tests.length === 0 ? (
              <div className="empty-state">
                <Terminal size={48} />
                <p>No API tests executed yet. Use the request builder to test endpoints.</p>
              </div>
            ) : (
              <div className="test-history">
                {tests.map((test, index) => (
                  <div key={index} className={`test-result ${test.status}`}>
                    <div className="test-header">
                      <div className="test-info">
                        <span className={`method-badge ${test.method.toLowerCase()}`}>
                          {test.method}
                        </span>
                        <span className="endpoint">{test.endpoint}</span>
                        <span className="timestamp">{test.timestamp}</span>
                      </div>
                      <div className="test-actions">
                        {test.status === 'success' && <CheckCircle size={16} className="success-icon" />}
                        {test.status === 'error' && <XCircle size={16} className="error-icon" />}
                        <button onClick={() => copyToClipboard(test.response)}>
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    {test.body && (
                      <div className="request-body">
                        <strong>Request Body:</strong>
                        <pre>{test.body}</pre>
                      </div>
                    )}

                    {test.headers && Object.keys(test.headers).length > 0 && (
                      <div className="request-headers">
                        <strong>Headers:</strong>
                        <pre>{JSON.stringify(test.headers, null, 2)}</pre>
                      </div>
                    )}

                    <div className="response-body">
                      <strong>Response:</strong>
                      <pre>{test.response}</pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {mode === 'ws' && (
        <div className="api-testing-grid">
          {/* WebSocket connection builder */}
          <div className="request-builder">
            <h3>WebSocket Connection</h3>

            <div className="endpoint-selector">
              <label>URL template (keep {'{experiment_id}'} where the ID goes):</label>
              <input
                type="text"
                value={wsUrlTemplate}
                onChange={(e) => setWsUrlTemplate(e.target.value)}
                disabled={wsLive}
                placeholder="ws://localhost:8080/ws/telemetry/{experiment_id}"
              />
            </div>

            <div className="endpoint-selector">
              <label>Experiment ID:</label>
              <input
                type="number"
                value={wsExperimentId}
                onChange={(e) => setWsExperimentId(e.target.value)}
                disabled={wsLive}
              />
            </div>

            <div className="endpoint-selector">
              <label>Access token (sent as ?access_token=..., browsers can't set custom headers):</label>
              <input
                type="password"
                value={wsToken}
                onChange={(e) => setWsToken(e.target.value)}
                disabled={wsLive}
                autoComplete="off"
                placeholder="Paste a valid token from your login flow"
              />
            </div>

            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <strong>Status:</strong>
              <span
                style={{
                  ...WS_STATUS_STYLES[wsStatus],
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                {wsStatus}
              </span>
            </div>
          </div>

          {/* WebSocket live log */}
          <div className="response-display">
            <h3>Live Messages ({wsEntries.length})</h3>

            {wsEntries.length === 0 ? (
              <div className="empty-state">
                <Radio size={48} />
                <p>No messages yet. Click Connect to start receiving telemetry.</p>
              </div>
            ) : (
              <div
                className="test-history"
                ref={wsLogRef}
                style={{ maxHeight: '32rem', overflowY: 'auto' }}
              >
                {wsEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="test-result"
                    style={{ background: WS_KIND_COLORS[entry.kind], color: '#1f2937' }}
                  >
                    <div className="test-header">
                      <div className="test-info">
                        <span className="method-badge get">{entry.kind}</span>
                        <span className="timestamp">{entry.time}</span>
                      </div>
                      <div className="test-actions">
                        <button onClick={() => copyToClipboard(entry.text)}>
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                    <pre>{entry.text}</pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showSaveDialog && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowSaveDialog(false); }}>
          <div className="modal-box" style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Save Endpoint</h2>
              <button className="modal-close" onClick={() => setShowSaveDialog(false)}><X size={18} /></button>
            </div>
            <div className="modal-field">
              <label className="modal-label">Endpoint Name</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Get User Profile"
                value={endpointName}
                onChange={(e) => setEndpointName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="modal-btn-cancel" onClick={() => setShowSaveDialog(false)}>Cancel</button>
              <button
                type="button"
                onClick={saveEndpoint}
                disabled={!endpointName.trim()}
                style={{
                  padding: '0.5625rem 1.25rem', border: 'none', borderRadius: '0.5rem',
                  fontSize: '0.875rem', fontWeight: 600, color: 'white', cursor: endpointName.trim() ? 'pointer' : 'not-allowed',
                  background: endpointName.trim() ? 'linear-gradient(135deg, rgb(155, 28, 28) 0%, rgb(192, 57, 43) 100%)' : '#94a3b8',
                  boxShadow: endpointName.trim() ? 'rgba(192, 57, 43, 0.25) 0px 2px 8px' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTestingSection;
