import type {Action} from '../actions/types';
import {LOGGED_IN, LOG_OUT, SAVE_HISTORY} from '../actions/types';

export type State = {
  userInfo: ?Object;
};

const initialState = {
  userInfo: {
    email: '',
    passcode: '',
    isLoggedIn: false,
  },
  history: []
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

  return state;
}