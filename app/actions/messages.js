import type { Action, ThunkAction } from './types';
import {SEND_MESSAGE, UPDATE_MESSAGES} from './types';
import firebase from 'react-native-firebase';

const messagesRef = firebase.database().ref('messages');
const fireBaseAuth = firebase.auth();

export function sendMessage(message) : ThunkAction {
  return (dispatch, getState) => {
    console.log('message ', message);
    // let {email,uid, userName} = user;

    let user = firebase.auth().currentUser;
    let {email,uid, displayName} = user;
    console.log('userName ', email,uid, displayName);

    messagesRef.push({
      message,
      m_Id: Math.random().toString(36).substr(2, 10),
      displayName, 
      email,
      u_id: uid
    }, () => {
      console.log('success');
    });
  };
}

export function fetchMessagesListener() : ThunkAction {
  return (dispatch, getState) => {
    messagesRef.on('value', (snapshot) => {
      const messages = snapshot.val();
      console.log("messages", messages);

      dispatch(updateMessagesList(messages ? messages : []));
    });
  };
}


function updateMessagesList(data: Array): Action {
  return {
    type: UPDATE_MESSAGES,
    data
  };
}