import * as React from 'react';

import { Result } from '../interfaces/Result';
import { ResultsState } from '../interfaces/ResultsState';
//import { Table, Column, Cell } from 'fixed-data-table';
import DataGrid = require('react-datagrid');

interface ColumnData {
  key: string;
  header: string;
  width?: number;
}

class Results extends React.Component<{results: Array<Result>}, {}> {

  onColumnResize (firstCol:any, firstSize:number, secondCol:any, secondSize:number) {
    firstCol.width = firstSize
    this.setState({})
  }

  render () {
    const results = this.props.results || [];
    // var columns: Array<ColumnData> = [
    //   {key: 'state', header: "State"},
    //   {key: 'candidateName', header: "Candidate"}
    // ];
    const columns: Array<any> = [
      { name: 'district', title: 'district', width: 75},
      { name: 'candidateName', title: 'Candidate'},
      { name: 'partyAbbreviation', title: 'Party', width: 100},
      { name: 'votesForCandidate', title: 'Votes', width: 100},
      { name: 'percentageOfVotesForCandidate', title: 'Percent', width: 100},
      { name: 'numberOfPrecinctsReporting', title: 'Precincts In', width: 110},
      { name: 'totalNumberOfPrecinctsVotingForTheOffice', title: 'Ttl Precincts', width: 115}
    ]

    if (results.length === 0) {
      return <p className="nodes-empty">Results List is Empty</p>;
    }
    
    return <DataGrid
      idProperty="id"
      columns={columns}
      dataSource={results}
      style={{height: 500}}
      />
  }
}

export class ResultsWidget extends React.Component<{results: ResultsState}, {}> {
  constructor () {
    super();
  }

  render () {
    return <div className={"node-status more-details row"}>
      <div className={'col-md-12'}>
        <p>Status: {this.props.results.status}, Last Update Time: {this.props.results.lastUpdate}</p>
        <Results results={this.props.results.results} />
      </div>
    </div>
  }
}