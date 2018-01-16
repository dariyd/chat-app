import type {Action} from '../actions/types';
import {LOGGED_IN, LOG_OUT, AUTH_ERROR, UPDATE_USERS} from '../actions/types';

export type State = {
  userInfo: ?Object;
};

const initialState = {
  userInfo: {
    email: '',
  },
  isLoggedIn: false,
  error: {
    code: '',
    message: '',
  },
  chatUsers: [],
};

export default function device(state: State = initialState, action: Action): State {
  if (action.type === LOGGED_IN) {
    let {userInfo} = action;
    global.LOG('action ', action);
    console.log('action.data LOGGED_IN ', userInfo);
    return {
      ...state,
      ...userInfo,
      isLoggedIn: true
    }
  }

  if (action.type === LOG_OUT) {
    global.LOG('action LOG_OUT');
    return {
      ...state,
      userInfo: {},
      isLoggedIn: false,
    }
  }

  if (action.type === AUTH_ERROR) {
    
    let {error} = action;
    let {code, message} = error;
    global.LOG('action AUTH_ERROR ', code, message);
    return {
      ...state,
      error: {
        code, 
        message
      }
    }
  }

  if (action.type === UPDATE_USERS) {
    let {chatUsers} = action;
    global.LOG('action AUTH_ERROR ', code, message);
    return {
      ...state,
      chatUsers
    }
  }

  return state;
}