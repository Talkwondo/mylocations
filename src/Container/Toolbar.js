/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, TextInput, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  actionCategory,
  changeText,
  unSelectedCategory,
} from '../Actions/actions';
import {toolbarStyle} from '../Styles/index';

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeText: (text) => dispatch(changeText(text)),
    onAddCategory: (category) => dispatch(actionCategory(category, 'add')),
    remove: (index) => dispatch(actionCategory(index, 'remove')),
    rename: (name, index) => dispatch(actionCategory(index, 'rename', name)),
    onUnSelectedCategory: () => dispatch(unSelectedCategory()),
  };
};

const mapStateToProps = (state) => {
  return {
    addText: state.changeText.addText,
    selected: state.selectCategory.selected,
  };
};

const Toolbar = (props) => {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setEdit(false);
  }, [props.selected]);

  const validateInput = () => {
    if (props.addText === '') {
      return Alert.alert(
        'Category name missing',
        'Please insert category name',
      );
    } else {
      props.onAddCategory(props.addText);
      props.onChangeText('');
    }
  };
  const onRemoveCategory = () => {
    props.remove(Number(props.selected));
    props.onUnSelectedCategory();
  };
  const changeName = () => {
    if (props.addText === '') {
      return Alert.alert(
        'Category name missing',
        'Please insert category name',
      );
    } else {
      props.rename(props.addText, Number(props.selected));
      props.onUnSelectedCategory();
      props.onChangeText('');
    }
  };
  if (edit) {
    return (
      <View style={toolbarStyle.container}>
        <Text style={toolbarStyle.title}>Categories</Text>
        <View style={toolbarStyle.column}>
          <View style={toolbarStyle.row}>
            <TextInput
              style={toolbarStyle.input}
              placeholder={'Edit Category...'}
              placeholderTextColor="grey"
              autoCorrect={false}
              value={props.addText}
              autoCapitalize="none"
              onChangeText={props.onChangeText}
              onSubmitEditing={changeName}
            />
            <Pressable onPress={changeName}>
              <View style={[toolbarStyle.buttonYellow, {width: 150}]}>
                <Text style={toolbarStyle.buttonText}>Edit Name</Text>
              </View>
            </Pressable>
          </View>
          <View style={toolbarStyle.row}>
            <View style={toolbarStyle.header}>
              <Text style={toolbarStyle.headerText}>Category List</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return props.selected ? (
    <View style={toolbarStyle.container}>
      <Text style={toolbarStyle.title}>Edit Category</Text>
      <View style={toolbarStyle.column}>
        <View
          style={[
            toolbarStyle.row,
            {justifyContent: 'space-between', marginHorizontal: 20},
          ]}>
          <Pressable onPress={() => setEdit(true)}>
            <View style={toolbarStyle.buttonYellow}>
              <Text style={toolbarStyle.buttonText}>Edit Name</Text>
            </View>
          </Pressable>
          <Pressable onPress={onRemoveCategory}>
            <View style={toolbarStyle.buttonRed}>
              <Text style={toolbarStyle.buttonText}>Delete Category</Text>
            </View>
          </Pressable>
        </View>
        <View style={toolbarStyle.row}>
          <View style={toolbarStyle.header}>
            <Text style={toolbarStyle.headerText}>Category List</Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={toolbarStyle.container}>
      <Text style={toolbarStyle.title}>Categories</Text>
      <View style={toolbarStyle.column}>
        <View style={toolbarStyle.row}>
          <TextInput
            style={toolbarStyle.input}
            placeholder={'Add Category...'}
            placeholderTextColor="grey"
            autoCorrect={false}
            value={props.addText}
            autoCapitalize="none"
            onChangeText={props.onChangeText}
            onSubmitEditing={validateInput}
          />
          <Pressable style={toolbarStyle.button} onPress={validateInput}>
            <View style={toolbarStyle.button}>
              <Text style={toolbarStyle.buttonText}>Add New</Text>
            </View>
          </Pressable>
        </View>
        <View style={toolbarStyle.row}>
          <View style={toolbarStyle.header}>
            <Text style={toolbarStyle.headerText}>Category List</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

Toolbar.propTypes = {
  addText: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  remove: PropTypes.func.isRequired,
  rename: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onUnSelectedCategory: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
};
