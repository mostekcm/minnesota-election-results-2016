import * as redux from 'redux';
import thunkMiddleware from 'redux-thunk';

import { results } from './reducers/results';

const reducer = redux.combineReducers({ 
  results
});

export const store = redux.createStore(reducer,
redux.applyMiddleware(
    thunkMiddleware
)); 
