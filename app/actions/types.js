'use strict';

// Constants
export const CONNECTION_CHANGE = 'CONNECTION_CHANGE';
export const LOGGED_IN = 'LOGGED_IN';
export const LOG_OUT = 'LOG_OUT';

export type Action =
  { type: CONNECTION_CHANGE, connection: string} |
  { type: LOGGED_IN, userInfo: Object} |
  { type: LOG_OUT}
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;