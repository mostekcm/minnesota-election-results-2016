import { LsblkState } from '../interfaces/LsblkState'

/**
 * Reducer for lsblk
 * @param state
 * @param action
 * @returns {any}
 */
export function lsblk (state: LsblkState={
    textIsVisible: false,
    text: "",
    isFetching: false,
    textIsGood: false
}, action: any): LsblkState {
    // console.log("State: "+JSON.stringify(state));
    // console.log("Action: "+JSON.stringify(action));
    if (action.type === 'REQUEST_LSBLK') {
        return {
            textIsVisible: true,
            text: "fetching...",
            isFetching: true,
            textIsGood: false
        }
    } else if (action.type=== 'RECEIVE_LSBLK') {
        return {
            textIsVisible: true,
            text: action.text,
            isFetching: false,
            textIsGood: true
        }
    }

    return state;
}
