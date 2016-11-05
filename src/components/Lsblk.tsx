import * as React from 'react';
import { LsblkState } from '../interfaces/LsblkState';
import { fetchLsblkIfNeeded } from '../interfaces/LsblkActions';
import { store } from '../store';

interface LsblkProps {
    ip: string;
    state: LsblkState;
}

export class Lsblk extends React.Component<LsblkProps, {}> {

    render () {

        const text:string = this.props.state.text;

        return <div>
        <div className="col-md-4">
            <button className="btn btn-success" onClick={(e) => {
                e.preventDefault();
                store.dispatch(fetchLsblkIfNeeded());
                }}>
                See Lsblk</button>
        </div>

        <div className="col-md-4">
            {text}
        </div>
            </div>
    }
}
