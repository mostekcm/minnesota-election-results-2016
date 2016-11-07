import * as React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';

import { ResultsWidget } from './ResultsWidget';
import { AppState } from '../interfaces/AppState';
import { ResultsState } from '../interfaces/ResultsState';
import { requestResults } from '../interfaces/ResultsActions';
import Select = require('react-select');


export class ElectionResults extends React.Component<{results: ResultsState, onStart: (mediafileid:number) => void }, { mediafileid: number, selectValue: string }> {
  refs: {
    fileSelect:any;
  }

  constructor() {
    super();

    this.state = { mediafileid: -1, selectValue: "" };
    this.focusStateSelect = this.focusStateSelect.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  handlePageSelect(val: any) {
    this.setState({mediafileid: val.value, selectValue: val.value });
  }

  handleSubmit (e: any) {
    e.preventDefault();
    this.props.onStart(this.state.mediafileid);
  }

  focusStateSelect() {
    this.refs.fileSelect.focus();
  }

  render () {
    var options = [
      { value: '22', label: 'U.S. President Statewide' },
      { value: '53', label: 'U.S. President by Congressional District' },
      { value: '54', label: 'U.S. President by Legislative District' },
      { value: '51', label: 'U.S. President by County' },
      { value: '52', label: 'U.S. President by Precinct' },
      { value: '24', label: 'U.S. Representative by Congressional District' },
      { value: '60', label: 'U.S. Representative by County' },
      { value: '29', label: 'U.S. Representative by Precinct' },
      { value: '66', label: 'Constitutional Amendment Statewide' },
      { value: '67', label: 'Constitutional Amendment by Congressional District' },
      { value: '65', label: 'Constitutional Amendment by County' },
      { value: '94', label: 'Constitutional Amendment by Precinct' },
      { value: '30', label: 'State Senate by District' },
      { value: '16', label: 'State Senate by Precinct' },
      { value: '20', label: 'State Representative by District' },
      { value: '21', label: 'State Representative by Precinct' },
      { value: '37', label: 'Supreme Court and Courts of Appeal Races' },
      { value: '44', label: 'District Court Races' },
      { value: '88', label: 'County Races and Questions' },
      { value: '14', label: 'Municipal Questions' },
      { value: '1', label: 'Municipal and Hospital District Races and Questions' },
      { value: '9', label: 'Municipal, Hospital, and School District Races by Precinct' },
      { value: '90', label: 'Hospital District Races' },
      { value: '17', label: 'School Referendum and Bond Questions' },
      { value: '7', label: 'School Board Races and Questions' },
      { value: '38', label: 'All Federal, State, and County Races by County' },
      { value: '13', label: 'All Federal, State, and County Races by Precinct' },
      { value: '93', label: 'Precinct Reporting Statistics' }
    ];

    return <div className="row">
      <div className={"col-md-12 setup-appliance" + ' fade-slide-down'} >
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset disabled={this.props.results.status !== "uninitialized"}>
            <Select
              name="mediafileid"
              options={options}
              value={this.state.selectValue}
              onChange={this.handlePageSelect}
              searchable={true}
              ref="fileSelect"
              autofocus
              clearable={true}
              />
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
    onStart: function (mediafileid:number) {
      store.dispatch(requestResults(mediafileid));
    }
  }
}

export const ElectionResultsSetup = connect(
  mapStateToProps, 
  mapDispatchToProps
)(ElectionResults);
