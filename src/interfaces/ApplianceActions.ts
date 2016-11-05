/**
 * Created by mostekcm on 10/11/16.
 */
import * as redux from 'redux';
import { ApplianceState } from './ApplianceState';
import * as fetch from 'isomorphic-fetch';

export interface managerAction extends redux.Action {
    ip: string,
    hostname?: string,
    lines?: Array<string>,
    lastMessageTime?: string,
    status: 'inactive'|'pending'|'success'
}

/* Action Creators */
function requestConfigInit() {
    return {
        type: 'INIT_CONFIG'
    }
}

function requestLogAction() {
    return {
        type: "REQUEST_LOGS"
    }
}

function receiveLogData(logData: any) {
    return {
        type: "RECEIVE_LOG_DATA",
        lines: logData.lines,
        lastMessageTime: logData.lastMessageTime
    }
}

export function addNode(ip:string): any {
    return {
        type: 'ADD_NODE',
        ip: ip
    }
}

function requestNextLogs(ip:string) {
    return (dispatch:any, getState:any) => {
        return fetch('http://'+ip+':8080/log/auth0-start.log?startTime='+getState().appliance.nodes[0].startLogLastMessageTime)
            .then((response:any) => response.json())
            .then((json:any) => dispatch(receiveLogData(json)));
    }
}

/* Log Lines dispatch */
function requestLogs(ip:string): any {
    return (dispatch:any) => {
        dispatch(requestLogAction());

        const timerId = setInterval(() => {
            dispatch(requestNextLogs(ip))
        }, 5000);
    }
}

/* Actual asynchronous dispatch wrappers */
function initConfig(ip: string, formData: any) {
    return (dispatch:any) => {
        dispatch(requestConfigInit());
        return fetch('http://'+ip+':8080/config/set-as-first', {
            method: 'post',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response:any) => response.json())
            .then((json:any) => dispatch(requestLogs(ip)));
    }
}

function shouldInitConfig(state: ApplianceState) {
    return state.status === "uninitialized";
}

export function initConfigIfNeeded(ip:string,formData:any):any {
    return (dispatch:any, getState:any) => {
        if (shouldInitConfig(getState().appliance)) {
            return dispatch(initConfig(ip,formData));
        }
    }
}
