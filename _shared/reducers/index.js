import { combineReducers } from 'redux'
import {
  BEEP
} from '../actions'


function app(state = {
  hello: ''
}, action) {
  switch (action.type) {

    case BEEP:
      return Object.assign({}, state, {
        hello: action.boop
      })

    default:
      return state
  }
}

export default combineReducers({
  app
});
