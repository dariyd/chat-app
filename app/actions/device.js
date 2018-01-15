
'use strict';

import type { Action, ThunkAction, PromiseAction } from './types';
import {CONNECTION_CHANGE} from './types';

export function changeConnectionState(connection: string): Action {
  return {
    type: CONNECTION_CHANGE,
    connection,
  };
}