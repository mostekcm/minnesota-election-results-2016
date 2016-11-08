/**
 * Created by mostekcm on 10/11/16.
 */
import * as redux from 'redux';
import { createResult, Result } from './Result';
import * as fetch from 'isomorphic-fetch';
import * as moment from 'moment';


export interface ResultsAction extends redux.Action {
    // will need when retrieving from more than one file type => type: string,
    results?: Array<Result>,
    lastUpdate?: string,
    status?: 'fetching'|'uninitialized'|'success'
}

/* Action Creators */
function requestResultsAction() : ResultsAction {
    return {
        type: 'REQUEST_RESULTS'
    }
}

function receiveResultsAction(results: Array<Result>) : ResultsAction {
    return {
        type: "RECEIVE_RESULTS",
        results: results,
        lastUpdate: moment().toISOString()
    }
}

function receiveRawResultsAction(text: string) {
    var results: Array<Result> = [];
    var lines: Array<string> = text.split("\n");
    lines.forEach(function(line) {
        results.push(createResult(line));
    });
    return receiveResultsAction(results);
}

function requestNextResults(mediafileid:number) {
    return (dispatch:any) => {
        dispatch(requestResultsAction());

        var url = location.hostname === "localhost" ? "http://localhost:3001" : "https://minnesota-election-2016-be.herokuapp.com";
        return fetch(url + '/?mediafileid='+mediafileid, {
            headers: {
                "Content-Type" : "text/plain"
            }
        })
            .then((response:any) => response.text())
            .then((text:any) => dispatch(receiveRawResultsAction(text)))
            .catch(error => { console.log("Got error: ",error); });

    }
}

/* Log Lines dispatch */
export function requestResults(mediafileid:number): any {
    return (dispatch:any) => {
        dispatch(requestNextResults(mediafileid));

        const timerId = setInterval(() => {
            dispatch(requestNextResults(mediafileid))
        }, 60000);
    }
}
