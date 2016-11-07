import * as React from 'react';

import { Result } from '../interfaces/Result';
import { ResultsState } from '../interfaces/ResultsState';
//import { Table, Column, Cell } from 'fixed-data-table';
import DataGrid = require('react-datagrid');


class Results extends React.Component<{results: Array<Result>}, { allFilterValues:any }> {

  constructor(props:{results: Array<Result>}) {
    super(props);
    this.state = { allFilterValues: {} };
    this.handleFilter = this.handleFilter.bind(this);
  }

  updateFilter(allFilterValues:any) {
    //reset data to original data-array
    var data = this.props.results;
    var columnsBeingFiltered = "";

    //go over all filters and apply them
    Object.keys(allFilterValues).forEach(function(name) {
      var columnFilter = (allFilterValues[name] + '').toUpperCase();

      if (columnFilter == '') {
        return
      }

      var columnFilters = columnFilter.split(',');

      columnsBeingFiltered += columnsBeingFiltered != "" ? "," + name : name;

      data = data.filter(function (item:any) {
        var matches = false;
        columnFilters.forEach(function (thisFilter) {
          var filter = thisFilter.trim();
          if (filter != '') {
            if ((item[name] + '').toUpperCase().indexOf(filter) === 0) {
              matches = true;
            }
          }
        });
        return matches;
      });
    });

    return { data: data, columnsBeingFiltered: columnsBeingFiltered };
  }

  handleFilter(column:any, value:string, allFilterValues:any) {
    this.setState({allFilterValues: allFilterValues });
  }

  render () {
    var updateResults = this.updateFilter(this.state.allFilterValues);

    const columns: Array<any> = [
      { name: 'district', title: 'district', width: 75, renderFilterField: false},
      { name: 'candidateName', title: 'Candidate'},
      { name: 'partyAbbreviation', title: 'Party', width: 100},
      { name: 'votesForCandidate', title: 'Votes', width: 100},
      { name: 'percentageOfVotesForCandidate', title: 'Percent', width: 100},
      { name: 'numberOfPrecinctsReporting', title: 'Precincts In', width: 110},
      { name: 'totalNumberOfPrecinctsVotingForTheOffice', title: 'Ttl Precincts', width: 115}
    ];

    return <div className={"row"}>
        <p>Columns Being Filtered: {(updateResults.columnsBeingFiltered == "" ? "none" : <span style={{color: "red"}}>{updateResults.columnsBeingFiltered}</span>)};
          <br/><span style={{color: "red"}}>NOTE: If you scroll through the table and then filter, you can unintentionally hide the values you find.  To fix, clear your filter and then scroll to the top, then set the filter again.</span></p>
        <DataGrid
          idProperty="id"
          columns={columns}
          dataSource={updateResults.data}
          style={{height: 500}}
          onFilter={this.handleFilter}
          liveFilter={true}
        />
      </div>
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