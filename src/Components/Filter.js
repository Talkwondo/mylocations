import React from 'react';
import {TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {toolbarStyle} from '../Styles/index';

const Filter = (props) => {
  return (
    <TextInput
      // eslint-disable-next-line react-native/no-inline-styles
      style={[toolbarStyle.picker, {fontSize: 40}]}
      placeholder={'Add text to filter'}
      placeholderTextColor="grey"
      autoCorrect={false}
      value={props.filterText}
      autoCapitalize="none"
      onChangeText={(text) => props.onValueChange(text)}
    />
  );
};

export default Filter;
