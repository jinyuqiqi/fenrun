import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as storeState from './reducer/reducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({...storeState}),
  applyMiddleware(thunk)
);

export default store;