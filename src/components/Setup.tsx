import * as React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';

import { Status } from './NodesStatus';
import { AppState } from '../interfaces/AppState';
import { ApplianceState } from '../interfaces/ApplianceState';
import { initConfigIfNeeded, addNode } from '../interfaces/ApplianceActions';
import { LsblkState } from '../interfaces/LsblkState';
import { Lsblk } from './Lsblk';

interface AddNodesProps {
  onNodeAdded: (node: {type: 'string', ip: 'string'}) => void;
  lsblk: LsblkState
}

class AddNodes extends React.Component<AddNodesProps, {}> {
  ipInput: any;

  /*<!-- TODO: Add IP passing when we are doing multiple nodes on LSBLK call --> */
  /* TODO: <div className="col-md-4">
   <Lsblk state={this.props.lsblk} ip='localhost' />
   </div> */

  render () {
    return <div className="form-group">
      <label htmlFor="ip">Node IP</label>
      <input className="form-control ip-input" name="ip" type="string" placeholder="10.0.0.1" ref={(ref) => this.ipInput = ref} />
      <button className="btn btn-success" onClick={(e) => {
        e.preventDefault();
        this.props.onNodeAdded(this.ipInput.value);
        this.ipInput.value = '';
      }}>Add Node</button>

    </div>
  }
}

interface SetupFormData {
  manage_url: string;
  rta_url: string;
  mongo_password: string;
}

export class Setup extends React.Component<{appliance: ApplianceState, lsblk: LsblkState, more_details: boolean, onSubmit: (ip:string,formData:SetupFormData) => void, onAddNode: () => void}, { more_details: boolean }> {
  myRefs:{manage_url:any,rta_url:any,mongo_password:any};

  constructor() {
    super();
    this.myRefs={manage_url:"",rta_url:"",mongo_password:""};
    this.state={more_details: false };
  }

  handleSubmit (e: any) {
    e.preventDefault();
    this.props.onSubmit(this.props.appliance.nodes[0].ip,{
      manage_url: this.myRefs.manage_url.value,
      rta_url: this.myRefs.rta_url.value,
      mongo_password: this.myRefs.mongo_password.value
    });
  }

  handleMoreDetails (more_details: boolean) {
    this.setState({
      more_details: more_details
    });
  }

  render () {
 
    const appliance = this.props.appliance || {};

    return <div className="row">
      <div className={"col-md-6 setup-appliance" + (this.state.more_details ? ' fade-slide-down' : '')} >
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset disabled={appliance.status !== 'uninitialized'}>
          <div className="form-group">
            <label htmlFor="manage_url">Manage url</label>
            <input placeholder="manage.auth0rocks.com" className="form-control" type="string" required name="manage_url" ref={(ref) => { this.myRefs.manage_url = ref; }} />
          </div>
          <div className="form-group">
            <label htmlFor="rta_url">RTA url</label>
            <input placeholder="rta.auth0rocks.com" className="form-control" type="string" required name="rta_url" ref={(ref) => { this.myRefs.rta_url = ref; }} />
          </div>
          <div className="form-group">
            <label htmlFor="mongo_password">MongoDB Password</label>
            <input placeholder="*****" className="form-control" type="password" required name="mongo_password" ref={(ref) => { this.myRefs.mongo_password = ref; }} />
          </div>
          <div>
            <AddNodes onNodeAdded={this.props.onAddNode} lsblk={this.props.lsblk} />
          </div>
          <button className="btn btn-success">Setup</button>
          </fieldset>
        </form>
        </div>
        <div className={this.state.more_details ? 'col-md-12' : 'col-md-6'}>
          <Status appliance={this.props.appliance}  onMoreDetails={this.handleMoreDetails.bind(this)} />
        </div>
      </div>;
  }
}

function mapStateToProps (state: AppState) {
  return {
    appliance: state.appliance,
    lsblk: state.lsblk
  }
}

function mapDispatchToProps (dispatch:any, ownProps:any) {
  return {
    onSubmit: function (ip:string, formData:SetupFormData) {
      store.dispatch(initConfigIfNeeded(ip, formData));
    },
    onAddNode: function (ip: string) {
      if (!ip) { return };
      store.dispatch(addNode(ip));
    }
  }
}

export const ApplianceSetup = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Setup);
