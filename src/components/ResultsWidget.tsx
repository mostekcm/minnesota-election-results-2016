import * as React from 'react';

import { Result } from '../interfaces/Result';
import { ResultsState } from '../interfaces/ResultsState';
import DataGrid = require('react-datagrid');

interface ResultsTableProps {
  districtOrCounty: string;
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
      <h5>{this.props.tableData.districtOrCounty != "" ? "District "+this.props.tableData.districtOrCounty : "Statewide"}</h5>
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

class Results extends React.Component<{results: Array<Result>}, { districtFilter:any, useCounty:boolean }> {

  constructor(props:{results: Array<Result>}) {
    super(props);
    this.state = { districtFilter: "", useCounty: false };
    this.handleFilter = this.handleFilter.bind(this);
    this.splitDataByDistrict = this.splitDataByDistrict.bind(this);
  }

  updateFilter() {
    //reset data to original data-array
    var data = this.props.results;
    this.state.useCounty = this.state.useCounty || (data.length > 0 && this.props.results[0].countyId && !this.props.results[0].district);
    console.log("Carlos, county: "+this.state.useCounty);
    var columnsBeingFiltered = "";

    //go over all filters and apply them
    var name = this.state.useCounty ? "countyId" : "district";
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
    var me = this;
    results.forEach(function(result) {
      var countyOrDistrict = (me.state.useCounty ? result.countyId : result.district);
      if (!(countyOrDistrict in props)) {
        props[countyOrDistrict] = {
          totalPrecincts: result.totalNumberOfPrecinctsVotingForTheOffice,
          precinctsReporting: result.numberOfPrecinctsReporting,
          districtOrCounty: countyOrDistrict,
          totalVotes: result.totalNumberOfVotesInArea,
          results: [result]
        }
      } else {
        props[countyOrDistrict].results.push(result);
      }
    });
    return props;
  }

  handleFilter(event:any) {
    this.setState({districtFilter:event.target.value, useCounty:this.state.useCounty});
  }

  handleSubmit(event:any) {
      event.preventDefault();
  }

  render () {
    var updateResults = this.updateFilter();

    const resultsList = Object.keys(updateResults.data).map((key, index) => <ResultsTable key={key}
        tableData={updateResults.data[key]} />);

    return <div className={"row"}>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={"districtFilter"}>{ this.state.useCounty ? "County" : "District" } Filter</label>
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