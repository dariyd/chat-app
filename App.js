/**
 * @flow
 */

import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider, connect } from 'react-redux';

import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './app/reducers';
import AppNavigation from './AppNavigation';

let isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});
  
const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
);

export default class App extends React.Component {

  constructor() {
    super();
    console.disableYellowBox = true;
  }

  componentWillMount(){

    if (isDebuggingInChrome) {
      window.store = store;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

global.alert = (title, message) => {
  Alert.alert(title, message);
};

global.alertWithCallback = (title, message, callback) => {
  Alert.alert(title, message, [
    {text: 'Ok', onPress: callback},
  ]);
};

global.alertWithPromt = (title, message, confirmAction, dismissAction) => {
  Alert.alert(title, message, [
    {text: 'No', onPress: dismissAction},
    {text: 'Yes', onPress: confirmAction},
  ]);
};

global.alertWithPromtAndButtons = (title, message, confirmTitle, dismissTitle, confirmAction, dismissAction) => {
  Alert.alert(title, message, [
    {text: dismissTitle, onPress: dismissAction},
    {text: confirmTitle, onPress: confirmAction},
  ]);
};

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};

global.timeout = async (ms: number = 25000): Promise<any> => {
  return new Promise((resolve, reject) => {
    let error: Object = new Error('Request Timed Out. Try again');
    error.status = 408;
    setTimeout(() => reject(error), ms);
  });
};

// gets the current screen from navigation state
global.getCurrentRouteName = (navigationState) => {

  //console.log('navigationState ', navigationState);
  if (!navigationState) {
    return null;
  }

  if (navigationState.routes) {
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return global.getCurrentRouteName(route);
    }
    return route.routeName;
  }

  if(navigationState.routeName) {
    return navigationState.routeName;
  }

};

