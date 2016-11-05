import { INodes } from './Nodes';

export interface ApplianceState {
  manage_url?: string,
  rta_url?: string,
  status?: 'uninitialized'|'initializing'|'initialized',
  nodes?: Array<INodes>
}
