import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import moment from 'moment';
import { logoutUser, fetchMessagesListener, sendMessage } from "./../actions";
import Style from './../Style';
import InputView from './common/InputView';

const ITEM_HEIGHT = 80;

class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: "Chat",
      headerTintColor: Style.BUTTON_COLOR,
      headerPressColorAndroid: Style.BUTTON_COLOR,
      headerRight: (
        <View style={styles.headerLeft}>
          <Button
            title="Log Out"
            color={Style.BUTTON_COLOR}
            onPress={() => state.params.onLogout && state.params.onLogout()}
          />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onLogout: this.onLogout
    });
  }

  componentDidMount() {
    this.props.fetchMessagesListener(); 
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messages !== nextProps.messages) {
      this.updateDataSource(nextProps.messages);
    }

  }

  updateDataSource = (data) => {
    //global.LOG('data ', data);
    this.data = data;
    let objKeys = !!data ? Object.keys(data) : [];
    //let dataSource = [];
    let dataSource = objKeys.map((key) => {
      return data[key];
    });

    this.setState({dataSource}, () => {
      setTimeout(()=>{ 
        this.flatList.scrollToEnd();
      }, 20)
      //this.flatList.scrollToEnd();
    });
    
  }

  render() {
    let {dataSource} = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.container}>
        <FlatList
          ref={(list) => this.flatList = list}
          keyExtractor={(item, index) => item.id}
          data={dataSource}
          renderItem={this._renderRow}
          // getItemLayout={(data, index) => (   
          //   {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT - 2) * index, index}
          // )}
          //onLayout={()=> this.flatList.scrollToEnd()}
        />

        <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
          <InputView viewStyle={{flex: 1}} placeholder='Enter your message' onValueChange={(mes) => { this.message = mes }} />
          <Button title="Send" onPress={() => this.sendMessage(this.message)} />
        </View>
      </KeyboardAvoidingView>
    );
  }

  _renderRow = ({item}) => {
    return (
      <View style={styles.rowStyle}>
        <View style={{flex: 1}}>
          <Text style={styles.rowText}><Text style={{fontWeight: 'bold'}}>Name: </Text>{item.displayName}</Text>
          <Text style={styles.rowText}><Text style={{fontWeight: 'bold'}}>Message: </Text>{item.message}</Text>
          <Text style={styles.rowText}><Text style={{fontWeight: 'bold'}}>Time: </Text>{ moment(item.time).fromNow() }</Text>
        </View>
        
      </View>

    )
  }

  sendMessage = (mes) => {
    global.LOG('mes ', mes);
    this.props.sendMessage(mes);
  }

  onLogout = () => {
    this.props.logOut();
  };


}

function select(store) {
  return {
    user: store.user,
    messages: store.messages.data,
  };
}

function actions(dispatch) {
  return {
    logOut: () => dispatch(logoutUser()),
    fetchMessagesListener: () => dispatch(fetchMessagesListener()),
    sendMessage: (mes) => dispatch(sendMessage(mes)),
  };
}

export default connect(select, actions)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  rowStyle: {
    //height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF7FD', 
    padding: 5, 
    margin: 3, 
    borderRadius: 3
  },
  rowText: {
    fontSize: 16,
    color: '#054F66',
    marginBottom: 3
  },
});
