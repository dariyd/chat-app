'use strict';

// Constants
export const CONNECTION_CHANGE = 'CONNECTION_CHANGE';
export const LOGGED_IN = 'LOGGED_IN';
export const LOG_OUT = 'LOG_OUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UPDATE_USERS = 'UPDATE_USERS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';

export type Action =
  { type: CONNECTION_CHANGE, connection: string} |
  { type: LOGGED_IN, userInfo: Object} |
  { type: LOG_OUT} |
  { type: AUTH_ERROR, error: Object} |
  { type: SEND_MESSAGE, message: string, user: Object} |
  { type: UPDATE_MESSAGES, messages: Array<Object>} |
  { type: UPDATE_USERS, users: Array<Object>}
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;