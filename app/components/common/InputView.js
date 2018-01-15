import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import PropTypes from 'prop-types';
import Style from "./../../Style";

class InputView extends Component {

  propTypes: {
    value: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    viewStyle: View.propTypes.style,
    onValueChange: PropTypes.func
  }

  defaultProps: {
    value: 0,
    placeholder: '',
    viewStyle: {},
    onValueChange: () => {}
  }


  constructor(props) {
    super(props);

    this.state = {
      isIOS : Platform.OS === 'ios', value: props.value, placeholder: props.placeholder,
      textHeight: 35 * Style.RATIO_X, plholderHeight: 35 * Style.RATIO_X
    }

    this.hoursInputsRefs = null;
  }

  render() {
    let {isIOS, value, textHeight, placeholder, plholderHeight} = this.state;

    return (
      <View style={[styles.inputWrapper, this.props.viewStyle]}>
        <TextInput
          ref={(ref) => {this.inputsRef = ref }}
          clearButtonMode='always'
          autoCorrect={false}
          autoCapitalize='none'
          placeholder={!!placeholder ? placeholder : 'Add Response'}
          selectionColor={Style.TEXT_COLOR}
          placeholderTextColor={Style.PLACEHOLDER_COLOR}
          style={[styles.input, { height: Math.max(41 * Style.RATIO_X, textHeight)}]} 
          keyboardType='email-address'
          underlineColorAndroid='transparent'
          onContentSizeChange={(event) => { this.changeValue('textHeight', event.nativeEvent.contentSize.height )} }
          onChangeText={(text) => {this.changeValue('value', text); this.props.onValueChange(text)} }
          value={value}
          onSubmitEditing={(event) => { !isIOS && this.inputsRef.blur() }}
          {...this.props}


          // ref={(ref) => {this.hoursInputsRefs = ref }}
          // multiline={true} 
          // blurOnSubmit={true} 
          // returnKeyType={'done'}
          // style={[styles.input, { height: Math.max(41 * Style.RATIO_X, textHeight)}]} 
          // underlineColorAndroid={Style.WHITE_COLOR} 
          // placeholder={!!placeholder ? placeholder : 'Add Response'}
          // placeholderTextColor={Style.PLACEHOLDER_TEXT_COLOR}
          // //maxLength={!!rowData.maxLength ? rowData.maxLength : 100}
          // {...this.props}
          // onContentSizeChange={(event) => { this.changeValue('textHeight', event.nativeEvent.contentSize.height )} }
          // onChangeText={(text) => {this.changeValue('value', text); this.props.onValueChange(text)} }
          // value={value} 
          // onSubmitEditing={(event) => { !isIOS && this.hoursInputsRefs.blur() }}
        />
      </View>
    );
  }

  changeValue = (property, value) => {
    this.setState({[property] : value});
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Style.INPUT_BORDER,
    borderBottomWidth: 1,
    //borderRadius: 11,
    marginHorizontal: 15,
    paddingVertical: 2 * Style.RATIO_X,
    paddingHorizontal: 5 * Style.RATIO_X,
  },
  input: {
    flex: 1,
    color: Style.INPUT_TEXT_COLOR,
    fontSize: Style.FONT_SIZE,
    textAlignVertical: 'center'
  },
})

export default InputView
