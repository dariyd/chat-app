/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from './../actions';
import Spinner from './common/Spinner';
import Style from './../Style';
import InputView from './common/InputView';

class Login extends Component<{}> {
  static navigationOptions = {
    title: 'Hello',
  };

  constructor(props) {
    super(props);
    this.userName = '';
    this.email = '';
    this.password = '';
    
    this.state = {
      isIOS: Platform.OS === 'ios', animating: false, showSignUp: false,
    };
  }

  componentWillMount() {
    global.LOG('LOGIN will mount');
  }

  componentWillReceiveProps(nextProps: Object) {

    if (this.props.user.error != nextProps.user.error) {
      let {code, message} = nextProps.user.error;
      console.log("ERROR")
      Alert.alert(code, message);
    }
  }

  render() {
    let {animating, showSignUp} = this.state;
    return (
      <KeyboardAvoidingView behavior={this.state.isIOS ? 'padding' : null} style={styles.container}>
        <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.welcome}>
            {'Chap App'}
          </Text>
          <Text style={styles.instructions}>
            {'To get started, enter your email and password'}
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-start',}}>
         {showSignUp ? <InputView placeholder='Name' onValueChange={(name) => { this.userName = name }} /> : null}
          <InputView placeholder='Enter your email' onValueChange={(email) => { this.email = email }} />
          <InputView placeholder='Enter your password' secureTextEntry={true} onValueChange={(password) => { this.password = password }} />

          
          <TouchableOpacity style={styles.button} onPress={() => this.onLogin(showSignUp)}>
            <Text style={styles.buttonText}>{showSignUp ? 'Sign Up' : 'Sign In'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', margin: 15, justifyContent: 'center'}}>
            <Text> {showSignUp ? '' : 'Don\'t have account ? '}</Text>
            <TouchableOpacity onPress={() => this.setState({showSignUp: !this.state.showSignUp})}>
              <Text style={styles.signUpButton}>{showSignUp ? 'Cancel' : 'Please Sign Up'} </Text>
            </TouchableOpacity>
          </View>

        <Spinner visible={animating} color={Style.BUTTON_COLOR} />

      </KeyboardAvoidingView>
    );
  }

  onLogin = (isSignUp) => {
    let {userName, email, password} = this;
    this.props.loginUser(isSignUp, {userName, email, password})
    //this.props.navigation.navigate('Home');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: Style.BUTTON_COLOR,
    height: 45,
    borderRadius: Style.isIOS ? 3 : 0,
    marginTop: 15,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  buttonText: {
    fontSize: 16,
    color: Style.WHITE_COLOR,
    //fontWeight: 'bold'
  },
  borderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Style.INPUT_BORDER,
    borderBottomWidth: 1,
    //borderRadius: 11,
    marginHorizontal: 15,
    paddingVertical: 2 * Style.RATIO_X,
    paddingHorizontal: 5 * Style.RATIO_X,
  },
  signUpButton: {
    textDecorationLine: 'underline',
    color: Style.BUTTON_COLOR
  }
});

function select(store) {
  return {
    user: store.user
  };
}

function actions(dispatch) {
  return {
    loginUser: (isSignUp, params) => dispatch(loginUser(isSignUp, params)),
  };
}

export default connect(select, actions)(Login);
