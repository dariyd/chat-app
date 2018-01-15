import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { logOut } from "./../actions";
import Style from './../Style';

class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: "Friends",
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

    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onLogout: this.onLogout
    });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>
          Hello
        </Text>
      </View>
    );
  }

  onLogout = () => {
    this.props.logOut();
  };


}

function select(store) {
  return {
    user: store.user,
  };
}

// function actions(dispatch) {
//   return {logOut: () => dispatch(logOut())};
// }

export default connect(select, {logOut})(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
