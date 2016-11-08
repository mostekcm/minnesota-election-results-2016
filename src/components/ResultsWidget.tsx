import * as React from 'react';

import { Result } from '../interfaces/Result';
import { ResultsState } from '../interfaces/ResultsState';
import DataGrid = require('react-datagrid');

interface ResultsTableProps {
  district: string;
  totalVotes: number;
  precinctsReporting: number;
  totalPrecincts: number;
  results: Array<Result>;
}

class ResultsTable extends React.Component<{ tableData: ResultsTableProps }, {}> {

  render() {
    var results = this.props.tableData.results ? this.props.tableData.results : [];

    const columns: Array<any> = [
      { name: 'partyAbbreviation', title: 'Pty', width: 50},
      { name: 'candidateName', title: 'Candidate'},
      { name: 'percentageOfVotesForCandidate', title: 'Percent', width: 60},
      { name: 'votesForCandidate', title: 'Votes', width: 75}
    ];

    const percent = 100*this.props.tableData.precinctsReporting/this.props.tableData.totalPrecincts;

    return <div className={"row"}>
      <h5>{this.props.tableData.district != "" ? "District "+this.props.tableData.district : "Statewide"}</h5>
      <p>
        Precincts: { this.props.tableData.precinctsReporting }/{ this.props.tableData.totalPrecincts }
        ({percent + "%"}),
        Total Votes: {this.props.tableData.totalVotes }
      </p>
      <DataGrid
            idProperty="id"
            columns={columns}
            dataSource={results}
        />
      </div>
  }
}

class Results extends React.Component<{results: Array<Result>}, { districtFilter:any }> {

  constructor(props:{results: Array<Result>}) {
    super(props);
    this.state = { districtFilter: "" };
    this.handleFilter = this.handleFilter.bind(this);
  }

  updateFilter() {
    //reset data to original data-array
    var data = this.props.results;
    var columnsBeingFiltered = "";

    //go over all filters and apply them
    var name = "district";
    var columnFilter = (this.state.districtFilter+'').toUpperCase();
    if (columnFilter != '') {
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
    }

    console.log("Carlos filtered down to: " + data.length + ", for: "+columnFilter);

    var splitResults = this.splitDataByDistrict(data);

    console.log("Carlos found "+Object.keys(splitResults).length + " districts");

    if (Object.keys(splitResults).length > 0) {
      console.log("Carlos, First one: "+JSON.stringify(splitResults[Object.keys(splitResults)[0]]));
    }

    return { data: splitResults, columnsBeingFiltered: columnsBeingFiltered };
  }

  splitDataByDistrict(results:Array<Result>) : { [key:string] : ResultsTableProps } {
    var props: { [key:string] : ResultsTableProps } = {};
    results.forEach(function(result) {
      if (!(result.district in props)) {
        props[result.district] = {
          totalPrecincts: result.totalNumberOfPrecinctsVotingForTheOffice,
          precinctsReporting: result.numberOfPrecinctsReporting,
          district: result.district,
          totalVotes: result.totalNumberOfVotesInArea,
          results: [result]
        }
      } else {
        props[result.district].results.push(result);
      }
    });
    return props;
  }

  handleFilter(event:any) {
    this.setState({districtFilter:event.target.value});
  }

  render () {
    var updateResults = this.updateFilter();

    const resultsList = Object.keys(updateResults.data).map((key, index) => <ResultsTable key={key}
        tableData={updateResults.data[key]} />);

    return <div className={"row"}>
      <form onSubmit={function() { return false; }}>
        <label htmlFor={"districtFilter"}>District Filter</label>
        <input type="string" placeholder="Comma separated list of districts" id="districtFilter" onChange={this.handleFilter} width={"100%"}/>
      </form>
      {resultsList}
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