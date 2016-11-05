import { LsblkState } from './LsblkState'
import * as fetch from 'isomorphic-fetch';

/* Action Creators */
export function requestLsblk() {
    return {
        type: 'REQUEST_LSBLK'
    }
}

export function receiveLsblk(json:any) {
    return {
        type: 'RECEIVE_LSBLK',
        text: json.stdout.join("<br/>")
    }
}

/* Actual asynchronous dispatch wrappers */
function fetchLsblk() {
    return (dispatch:any) => {
        dispatch(requestLsblk());
        return fetch('http://localhost:8080/lsblk')
            .then((response:any) => response.json())
            .then((json:any) => dispatch(receiveLsblk(json)));
    }
}

function shouldFetchLsblk(state: LsblkState) {
    return !state.textIsGood;
}

export function fetchLsblkIfNeeded():any {
    return (dispatch:any, getState:any) => {
        if (shouldFetchLsblk(getState())) {
            return dispatch(fetchLsblk());
        }
    }
}

