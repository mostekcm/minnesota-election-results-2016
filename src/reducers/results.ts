import { ResultsState } from '../interfaces/ResultsState';
import { ResultsAction } from '../interfaces/ResultsActions';

export function results (state: ResultsState={results: [], lastUpdate: '', status: 'uninitialized'}, action: ResultsAction): ResultsState {
    if (action.type === 'REQUEST_RESULTS') {
      return Object.assign({}, state, {
         status: 'fetching'
      })
    }

    if (action.type === 'RECEIVE_RESULTS') {
      return Object.assign({}, state, {
        results: action.results,
        lastUpdate: action.lastUpdate,
        status: 'success'
      });
    }

  return state;
}