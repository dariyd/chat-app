import type { Action, ThunkAction } from './types';
import {LOGGED_IN, LOG_OUT, AUTH_ERROR, UPDATE_USERS} from './types';
import firebase from 'react-native-firebase';

const config = {
  apiKey: "AIzaSyCGiLfyetKIQ9_ZiaNPFdP7fR3DviTT4OA",
  authDomain: "chat-app-8ed41.firebaseapp.com",
  databaseURL: "https://chat-app-8ed41.firebaseio.com",
  projectId: "chat-app-8ed41",
  storageBucket: "",
  messagingSenderId: "570595362401"
};

const app = firebase.initializeApp(config);
const fireBaseAuth = firebase.auth();
const usersRef = firebase.database().ref('users');


export function loginUser(isSignUp: boolean, params: object) : ThunkAction {
  return (dispatch, getState) => {

    let {email, password, userName} = params;
    isSignUp 
    ? firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      let user = firebase.auth().currentUser;

      //dispatch(addUser(newUser,userName));
      
      //global.LOG('firebase.auth().currentUser; ', firebase.auth().currentUser)
      user.updateProfile({
        displayName: userName
      }).then(function() {
        global.LOG('Update successful.')
        // Update successful.
      }).catch(function(error) {
        global.LOG('Update error.', error)
        // An error happened.
      });
    }).catch(error => dispatch(authError(error))) 
    : firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      global.LOG('firebase.auth().currentUser; ', firebase.auth().currentUser.displayName)
    }).catch(error => dispatch(authError(error)));

    fireBaseAuth.onAuthStateChanged(user => {
      if (user) {
        //global.LOG(user);
        let {email,uid,displayName} = user;
        dispatch(login({email,uid,displayName}))
      }
      
    });
  };
}

function addUser(user, userName) : ThunkAction {
  return (dispatch, getState) => {
    console.log('userName ', userName);
    let {email,uid} = user;
    usersRef.push({
      userName,email,uid, active: true
    }, () => {
      console.log('success');
    });
  };
}

export function getUsersListener() : ThunkAction {
  return (dispatch, getState) => {
    usersRef.on('value', (snapshot) => {
      const users = snapshot.val();
      console.log("users", users);

      dispatch(updateChatUsersList(users));
    });
  };
}

export function initFirebase() : ThunkAction {
  return (dispatch, getState) => {

    console.log('Init firebase');
    fireBaseAuth.onAuthStateChanged(user => {
      if (user) {
        //global.LOG(user);
        let {email,uid,displayName} = user;
        dispatch(login({email,uid,displayName}))
      }

      global.LOG('user ', user ? user.displayName : 'NO USER');
    });

    if (!firebase.apps.length) {
      //firebase.initializeApp(config);
    }
  };
}

export function logoutUser() : ThunkAction {
  return (dispatch, getState) => {

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      dispatch(logOut());
    }).catch(function(error) {
      // An error happened.
    });
  };
}

export function login(userInfo: Object): Action {
  return {
    type: LOGGED_IN,
    userInfo,
  };
}

export function authError(error: Object): Action {
  //let {code, message} = error; 
  //console.log(error)
  return {
    type: AUTH_ERROR,
    error,
  };
}

export function logOut(): Action {
  return {
    type: LOG_OUT,
  };
}

export function updateChatUsersList(chatUsers: Array): Action {
  return {
    type: UPDATE_USERS,
    chatUsers
  };
}

