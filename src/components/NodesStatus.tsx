import * as React from 'react';

import { INodes } from '../interfaces/Nodes';
import { ApplianceState } from '../interfaces/ApplianceState';



class Nodes extends React.Component<{nodes: Array<INodes>, onCheckMoreDetails: (node: INodes) => void, selectedNode?: INodes}, {}> {
  handleClick (node: INodes) {
    this.props.onCheckMoreDetails(node);
  }

  render () {
  const nodes = this.props.nodes || [];

  if (nodes.length === 0) {
    return <p className="nodes-empty">Node list is empty</p>;
  }

  const nodeList = nodes.map((node, index) => <li key={node.hostname} className={node.status}>{node.hostname} 
    <a href="#" onClick={(e) => {
      e.preventDefault();
      this.handleClick.call(this, node);
    }}>
      {node.status === 'pending' ? <span className="icon icon-budicon-178"></span> : ''}
    </a>
  </li>);

  return <ul>
    {nodeList}
    </ul>; 
  }
}

export class NodeStatus extends React.Component<{nodes: Array<INodes>}, {}> {
  render () {
    const status: Array<JSX.Element> = (() => {
      const lines = this.props.nodes.map((node) => {
        if (node.status === 'pending') {
          return <li key={node.hostname}>{node.hostname} is initializing.</li>;
        }

        return <li key={node.hostname} >{node.hostname} is idle.</li>; 
      });

      return lines;
    })();

    if (this.props.nodes.length === 0) {
      return null;
    }

    return <code className="appliance-status">
      <ul className="node-detail-log">
        {status}
      </ul>
    </code>
  }
}

export class Status extends React.Component<{appliance: ApplianceState, onMoreDetails: (more_details: boolean) => void}, {selected_node?: INodes}> {
  constructor () {
    super();
    this.state = {
      selected_node: null
    };
  }

  checkMoreDetails (node: INodes) {
    if (this.state.selected_node && this.state.selected_node.hostname === node.hostname) {
      this.props.onMoreDetails(false);
      this.setState({
        selected_node: null
      });
    } else {
      this.props.onMoreDetails(true);
      this.setState({
        selected_node: node
      });
    }
  }

  render () {
    var logLineData = this.props.appliance.nodes.length > 0 ? this.props.appliance.nodes[0].startLogLines : "No" +
    " nodes yet";
    //<div dangerouslySetInnerHTML={{__html: '<code id="startLogData" style="overflow:auto; resize: both;">'+
    //    logLineData+
    //    '</code>'}} />
    return <div className={"node-status " + (this.state.selected_node ? 'more-details row' : '')}>
      <div className={this.state.selected_node ? 'col-md-6' : ''}>
        <h4>Node Status</h4>
        <Nodes nodes={this.props.appliance.nodes} selectedNode={this.state.selected_node} onCheckMoreDetails={this.checkMoreDetails.bind(this)} />
        
        <NodeStatus nodes={this.props.appliance.nodes} />
      </div>
      <div className={"node-logs col-md-6 " + (this.state.selected_node ? '' : 'hide')}>
        <div dangerouslySetInnerHTML={{__html: '<code id="startLogData" style="overflow:auto; resize: both;">'+
        logLineData+
        '</code>'}} />
      </div>
    </div>
  }
}