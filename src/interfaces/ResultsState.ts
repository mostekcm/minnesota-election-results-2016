import { Result } from './Result';

export interface ResultsState {
  results?: Array<Result>,
  lastUpdate?: string,
  status: 'uninitialized' | 'fetching' | 'success'
}
