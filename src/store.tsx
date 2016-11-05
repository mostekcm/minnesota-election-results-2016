import * as redux from 'redux';
import thunkMiddleware from 'redux-thunk';

import { appliance } from './reducers/appliance';
import { lsblk } from './reducers/lsblk';

const reducer = redux.combineReducers({ 
  appliance, lsblk
});

export const store = redux.createStore(reducer,
redux.applyMiddleware(
    thunkMiddleware
)); 
