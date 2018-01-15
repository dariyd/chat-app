import type { Action, ThunkAction } from './types';
import {LOGGED_IN, LOG_OUT} from './types';
//import firebase from 'react-native-firebase';


export function loginUser(email: string, passcode: string) : ThunkAction {
  return (dispatch, getState) => {

    const userPromise = new Promise((resolve, reject) => {

    });

    userPromise.then(
      (result) => {
        dispatch(saveUser({...result, email, passcode, isLoggedIn: true}));
      }, (fail) => {
      }
    );
    return userPromise;
  };
}

// export function initFirebase() {
//   var config = {
//     apiKey: "AIzaSyCGiLfyetKIQ9_ZiaNPFdP7fR3DviTT4OA",
//     authDomain: "chat-app-8ed41.firebaseapp.com",
//     databaseURL: "https://chat-app-8ed41.firebaseio.com",
//     projectId: "chat-app-8ed41",
//     // storageBucket: "",
//     // messagingSenderId: "570595362401"
//   };

//   if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//     firebase.auth().onAuthStateChanged(user => {
//       global.LOG(user);
//       dispatch(login(user))
//     });
//   }
// }

// export function logoutUser() : ThunkAction {
//   return (dispatch, getState) => {

//     firebase.auth().signOut().then(function() {
//       // Sign-out successful.
//       dispatch(logOut());
//     }).catch(function(error) {
//       // An error happened.
//     });
//   };
// }

export function login(userInfo: Object): Action {
  return {
    type: LOGGED_IN,
    userInfo,
  };
}

export function logOut(): Action {
  return {
    type: LOG_OUT,
  };
}