import * as redux from 'redux';
import { ApplianceState } from '../interfaces/ApplianceState';
import { managerAction } from '../interfaces/ApplianceActions';
import * as moment from 'moment';

export function appliance (state: ApplianceState={nodes: [], status: 'uninitialized'}, action: managerAction): ApplianceState {
    if (action.type === 'ADD_NODE') {
      return Object.assign({}, state, {
        nodes: [
          ...state.nodes,
          {
            ip: action.ip,
            hostname: `a0-${state.nodes ? state.nodes.length+1 : 1 }`,
            status: 'inactive'
          }
        ]
      })
    }

    if (action.type === 'INIT_CONFIG') {
      if (state.nodes.length === 0) {
        return state;
      }

      const new_nodes = state.nodes.slice(0, state.nodes.length);

      new_nodes[0].status = 'pending';

      return Object.assign({}, state, {
        nodes: new_nodes,
        status: 'initializing'
      })
    }

    if (action.type === 'REQUEST_LOGS') {
      if (state.nodes.length === 0) {
        return state;
      }

      /* TODO: Make this actually pick the right node */
      const new_nodes = state.nodes.slice(0, state.nodes.length);

      new_nodes[0].startLogLines = 'Fetching logs...';
      new_nodes[0].startLogLastMessageTime = moment().format("YYYY-MM-DD");

      return Object.assign({}, state, {
        nodes: new_nodes,
      })
    }

  if (action.type === 'RECEIVE_LOG_DATA') {
    if (state.nodes.length === 0) {
      return state;
    }

    /* TODO: Make this actually pick the right node */
    const new_nodes = state.nodes.slice(0, state.nodes.length);

    if (new_nodes[0].startLogLines === 'Fetching logs...') new_nodes[0].startLogLines = "";
    if (action.lines.length > 0) {
      new_nodes[0].startLogLines += action.lines.join("<br/>");
    }
    if (action.lastMessageTime) {
      new_nodes[0].startLogLastMessageTime = action.lastMessageTime;
    } else {
      new_nodes[0].startLogLastMessageTime = moment().format("YYYY-MM-DD");
    }

    return Object.assign({}, state, {
      nodes: new_nodes,
    })
  }

  return state;
}