export enum TaskStatus {
  PENDING = 'PENDING',
  DONE = 'DONE'
}

export interface DeviceItem {
  name: string;
  status: TaskStatus;
  id: number;
}

export interface DeviceItems {
  pending: DeviceItem[];
  done: DeviceItem[];
}

export interface NewDeviceItemItem {
  name: string;
  status: TaskStatus;
}

export interface ConnectorConfig {
  type: 'mqtt' | 'mqtt_web_socket' | 'rest' | 'custom';
  topic?: string;
  qos?: number;
  endpoint?: string;
  settings?: Record<string, string>;
}

export interface FieldDaqSetup {
  device: {
    device_id: string;
    name: string;
    protocol: string;
    connector: ConnectorConfig;
  };
}

export interface NewExperimentItem {
  name: string;
  status: TaskStatus;
  field_daq?: FieldDaqSetup;
}
export interface DeviceItemItem {
  id: number;
  name: string;
  status: TaskStatus;
}

// TODO: Remove Type alias for backward compatibility

export type ExperimentItem = DeviceItem;

export interface Experiments {
  experiments?: Record<string, any>;
  pending?: any[];
  done?: any[];
}
