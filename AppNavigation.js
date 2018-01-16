import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  NetInfo,
  AppState,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './app/components/Login';
import HomeScreen from './app/components/Home';
import {changeConnectionState, initFirebase } from './app/actions';


const ScreenNavigator = (signedIn = false) => {
  return StackNavigator({
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
  }, { 
    initialRouteName: !signedIn ? 'Login' : 'Home',
    //headerMode: 'none',
  } );
};

class AppNavigation extends React.Component {

  componentDidMount() {
    NetInfo.getConnectionInfo().done(this._handleConnectionInfoChange);
    NetInfo.addEventListener('connectionChange', this._handleConnectionInfoChange);
    AppState.addEventListener('change', this._handleAppStateChange);

    this.props.initFirebase();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.user.isLoggedIn !== nextProps.user.isLoggedIn
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this._handleConnectionInfoChange);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleConnectionInfoChange = (connectionInfo) => {
    global.LOG('connectionInfo ', connectionInfo);
    this.props.changeConnectionState(connectionInfo.type);
  }

  _handleAppStateChange = (currentAppState) => {
    if (currentAppState === 'active') {
      NetInfo.fetch().done(this._handleConnectionInfoChange);
    }
    console.log(currentAppState);
  }

  render() {
    console.log('this.props.user.isLoggedIn ', this.props.user.isLoggedIn)
    const ScreenNavigation = ScreenNavigator(this.props.user.isLoggedIn);
    //const MainNavigator = MainModalNavigator(ScreenNavigation);

    return (
      <ScreenNavigation
        ref={nav => { this.navigator = nav; }}
        onNavigationStateChange={(prevState, currentState) => {
          const currentScreen = global.getCurrentRouteName(currentState);
          //const prevScreen = getCurrentRouteName(prevState);

          StatusBar.setBarStyle('dark-content', false)
          //currentScreen == 'Login' ? StatusBar.setBarStyle('dark-content', false) : StatusBar.setBarStyle('light-content', false);

          global.currentRoute = currentScreen
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initFirebase: () => dispatch(initFirebase()),
    changeConnectionState: (connectionInfo) => dispatch(changeConnectionState(connectionInfo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);