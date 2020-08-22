import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {menuStyle} from '../Styles/index';

const texts = (props, text) => {
  switch (text) {
    case 'sort':
      return props.sort ? 'Unsort' : 'Sort';
    case 'group':
      return props.group ? 'Ungroup' : 'Group';
    case 'filter':
      return props.filter ? 'Unfilter' : 'Filter';
    default:
      return null;
  }
};

const Menu = (props) => (
  <View style={menuStyle.container}>
    <View style={menuStyle.row}>
      <Pressable
        style={menuStyle.button}
        onPress={() => props.setSort(!props.sort)}>
        <Text style={menuStyle.buttonText}>{texts(props, 'sort')}</Text>
      </Pressable>
      <Pressable
        style={menuStyle.button}
        onPress={() => props.setGroup(!props.group)}>
        <Text style={menuStyle.buttonText}>{texts(props, 'group')}</Text>
      </Pressable>
      <Pressable
        style={menuStyle.button}
        onPress={() => props.setFilter(!props.filter)}>
        <Text style={menuStyle.buttonText}>{texts(props, 'filter')}</Text>
      </Pressable>
    </View>
  </View>
);

export default Menu;
