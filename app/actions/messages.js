import type { Action, ThunkAction } from './types';
import {SEND_MESSAGE, UPDATE_MESSAGES} from './types';
import firebase from 'react-native-firebase';
import moment from 'moment';

const messagesRef = firebase.database().ref('messages');
const fireBaseAuth = firebase.auth();

export function sendMessage(message) : ThunkAction {
  return (dispatch, getState) => {
    console.log('message ', message);
    // let {email,uid, userName} = user;

    let user = firebase.auth().currentUser;
    let {email,uid, displayName} = user;
    console.log('userName ', email,uid, displayName);

    let newMessageRef = messagesRef.push();
    let msg = {
      id: newMessageRef.key,
      message,
      displayName, 
      email,
      time: moment().valueOf(),
      //u_id: uid
    }

    newMessageRef.set(msg);

    // messagesRef.push({
    //   message,
    //   m_id: Math.random().toString(36).substr(2, 10),
    //   displayName, 
    //   email,
    //   createdAt: moment().valueOf(),
    //   u_id: uid
    // }, () => {
    //   console.log('success');
    // });
  };
}

export function fetchMessagesListener() : ThunkAction {
  return (dispatch, getState) => {

    messagesRef.orderByKey().limitToLast(10).on('value', (snapshot) => {

      let keys = snapshot.key;
      let messages = snapshot.val();

      let mesArray = []
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        //console.log("keys", childKey);
        //console.log("childData", childData);
        mesArray.push(childData);

      });

      dispatch(updateMessagesList(mesArray));
    });
  };
}


function updateMessagesList(data: Array): Action {
  return {
    type: UPDATE_MESSAGES,
    data
  };
}