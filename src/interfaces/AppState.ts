import { ApplianceState } from './ApplianceState';
import { LsblkState } from './LsblkState';

export interface AppState {
  appliance: ApplianceState;
  lsblk: LsblkState;
};