import * as React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';

import { ResultsWidget } from './ResultsWidget';
import { AppState } from '../interfaces/AppState';
import { ResultsState } from '../interfaces/ResultsState';
import { requestResults } from '../interfaces/ResultsActions';

export class ElectionResults extends React.Component<{results: ResultsState, onStart: () => void }, {  }> {
  constructor() {
    super();
  }

  handleSubmit (e: any) {
    e.preventDefault();
    this.props.onStart();
  }

  render () {
    return <div className="row">
      <div className={"col-md-12 setup-appliance" + ' fade-slide-down'} >
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <button className="btn btn-success">ElectionResults</button>
          </fieldset>
        </form>
        <div className={'col-md-12'}>
          <ResultsWidget results={this.props.results} />
        </div>
      </div>
    </div>
  }
}

function mapStateToProps (state: AppState) {
  return {
    results: state.results
  }
}

function mapDispatchToProps (dispatch:any, ownProps:any) {
  return {
    onStart: function () {
      store.dispatch(requestResults());
    }
  }
}

export const ElectionResultsSetup = connect(
  mapStateToProps, 
  mapDispatchToProps
)(ElectionResults);
