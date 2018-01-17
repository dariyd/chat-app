'use strict';

import type {Action} from '../actions/types';
import {UPDATE_MESSAGES} from '../actions/types';

export type State = {
  data: ?Array;
};

const initialState = {
  data: [],
};

export default function device(state: State = initialState, action: Action): State {
  if (action.type == UPDATE_MESSAGES) {
    let {data} = action;
    //console.log('action.data UPDATE_MESSAGES ', data);
    return {
      ...state,
      data
    }
  }

  return state;
}