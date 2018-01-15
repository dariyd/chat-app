'use strict';

import type {Action} from '../actions/types';
import {CONNECTION_CHANGE} from '../actions/types';

export type State = {
  connection: ?string;
};

const initialState = {
  connection: '',
};

export default function device(state: State = initialState, action: Action): State {
  if (action.type == CONNECTION_CHANGE) {
    let {connection} = action;
    console.log('action.data CONNECTION_CHANGE ', connection);
    return {
      ...state,
      connection
    }
  }

  return state;
}