
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'

var initialState; // undefined unless...
if(typeof window !== 'undefined' && typeof window.__INITIAL_STATE__ !== 'undefined') {
  initialState = window.__INITIAL_STATE__
}

export default createStore(reducers, initialState);
