// @flow

import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';

const SIZES = ['small', 'normal', 'large'];

class Spinner extends React.Component {

  static defaultProps = {
    visible: false,
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)'
  };

  static propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    overlayColor: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { visible: props.visible };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  render() {
    const { visible } = this.state;

    if (!visible)
      return (
        <View />
      );

    const spinner = (
      <View style={styles.container} key={`spinner_${Date.now()}`}>
        <View
          style={[
            styles.background,
            { backgroundColor: this.props.overlayColor }
          ]}
        >
          <ActivityIndicator
            color={this.props.color}
            size={this.props.size}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    );

    return spinner;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Spinner