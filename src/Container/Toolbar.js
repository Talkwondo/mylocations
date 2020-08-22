/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, TextInput, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import PropTypes from 'prop-types';
import Filter from '../Components/Filter';
import {connect} from 'react-redux';
import {
  actionCategory,
  changeText,
  unSelectedCategory,
  changeTextLocation,
  actionLocation,
  unSelectedLocation,
} from '../Actions/actions';
import {toolbarStyle} from '../Styles/index';

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTextLocation: (text) => dispatch(changeTextLocation(text)),
    onAddLocation: (location) => dispatch(actionLocation(location, 'add')),
    onChangeText: (text) => dispatch(changeText(text)),
    onAddCategory: (category) => dispatch(actionCategory(category, 'add')),
    removeCategory: (index) => dispatch(actionCategory(index, 'remove')),
    removeLocation: (index) => dispatch(actionLocation(index, 'remove')),
    renameCategory: (name, index) =>
      dispatch(actionCategory(index, 'rename', name)),
    renameLocation: (name, index) =>
      dispatch(actionLocation(index, 'rename', name)),
    onUnSelectedCategory: () => dispatch(unSelectedCategory()),
    onUnSelectedLocation: () => dispatch(unSelectedLocation()),
  };
};

const mapStateToProps = (state) => {
  return {
    addText: state.changeText.addText,
    selected: state.selectCategory.selected,
    addTextLocation: state.changeTextLocation.addTextLocation,
    categories: state.changeCategory.categories,
    selectedLocation: state.selectLocation.selectedLocation,
  };
};

const Toolbar = (props) => {
  const [edit, setEdit] = useState(false);
  const [category, insertCategory] = useState(null);
  useEffect(() => {
    setEdit(false);
  }, [props.selected, props.selectedLocation]);

  const validateInput = () => {
    if (
      (props.page === 'category' && props.addText === '') ||
      (props.page === 'location' && props.addTextLocation === '')
    ) {
      return Alert.alert(
        `${props.page} name missing`,
        `Please insert ${props.page} name`,
      );
    } else if (props.page === 'location' && category === null) {
      return Alert.alert(
        'Location must have category',
        'Please pick category from the list or add one',
      );
    } else {
      if (props.page === 'category') {
        props.onAddCategory(props.addText);
        props.onChangeText('');
      } else {
        props.onAddLocation({
          name: props.addTextLocation,
          category: category,
        });
        props.onChangeTextLocation('');
      }
    }
  };

  const picker = () =>
    props.categories.map((item, index) => (
      <Picker.Item key={index} label={item} value={item} />
    ));

  const addCategory = () => {
    return props.page === 'location' ? (
      <View style={[toolbarStyle.row, {marginTop: 5}]}>
        {!props.filter ? (
          <Picker
            selectedValue={category}
            style={toolbarStyle.picker}
            itemStyle={{color: 'white', height: 100}}
            onValueChange={(itemValue) => insertCategory(itemValue)}>
            <Picker.Item
              key={'pickerdefault'}
              label={'Pick from the list'}
              value={null}
            />
            {picker()}
          </Picker>
        ) : (
          <Filter
            onValueChange={props.setFilterText}
            value={props.filterText}
          />
        )}
      </View>
    ) : null;
  };

  const handleValue = () =>
    props.page === 'category' ? props.addText : props.addTextLocation;

  const handleChangeText = (text) =>
    props.page === 'category'
      ? props.onChangeText(text)
      : props.onChangeTextLocation(text);

  const onRemoveCategory = () => {
    if (props.page === 'category') {
      props.removeCategory(Number(props.selected));
      props.onUnSelectedCategory();
    } else {
      props.removeLocation(props.selectedLocation);
      props.onUnSelectedLocation();
    }
  };

  const changeName = () => {
    if (
      (props.page === 'category' && props.addText === '') ||
      (props.page === 'location' && props.addTextLocation === '')
    ) {
      return Alert.alert(
        `${props.page} name missing`,
        `Please insert ${props.page} name`,
      );
    } else if (props.page === 'category') {
      props.renameCategory(props.addText, Number(props.selected));
      props.onChangeText('');
      props.onUnSelectedCategory();
    } else {
      props.renameLocation(props.addTextLocation, props.selectedLocation);
      props.onChangeTextLocation('');
      props.onUnSelectedLocation();
    }
  };

  if (edit) {
    return (
      <View style={toolbarStyle.container}>
        <Text style={toolbarStyle.title}>{props.label}</Text>
        <View style={toolbarStyle.column}>
          <View style={toolbarStyle.row}>
            <TextInput
              style={toolbarStyle.input}
              placeholder={props.editTitleInput}
              placeholderTextColor="grey"
              autoCorrect={false}
              value={handleValue()}
              autoCapitalize="none"
              onChangeText={handleChangeText}
              onSubmitEditing={changeName}
            />
            <Pressable onPress={changeName}>
              <View style={[toolbarStyle.buttonYellow, {width: 150}]}>
                <Text style={toolbarStyle.buttonText}>Edit Name</Text>
              </View>
            </Pressable>
          </View>
          {addCategory()}
          <View style={toolbarStyle.row}>
            <View style={toolbarStyle.header}>
              <Text style={toolbarStyle.headerText}>{props.title}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return props.selected || props.selectedLocation ? (
    <View style={toolbarStyle.container}>
      <Text style={toolbarStyle.title}>{props.editTitle}</Text>
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
              <Text style={toolbarStyle.buttonText}>
                {props.deleteButtonText}
              </Text>
            </View>
          </Pressable>
        </View>
        {addCategory()}
        <View style={toolbarStyle.row}>
          <View style={toolbarStyle.header}>
            <Text style={toolbarStyle.headerText}>{props.title}</Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={toolbarStyle.container}>
      <Text style={toolbarStyle.title}>{props.label}</Text>
      <View style={toolbarStyle.column}>
        <View style={toolbarStyle.row}>
          <TextInput
            style={toolbarStyle.input}
            placeholder={props.textInputTitle}
            placeholderTextColor="grey"
            autoCorrect={false}
            value={handleValue()}
            autoCapitalize="none"
            onChangeText={handleChangeText}
            onSubmitEditing={validateInput}
          />
          <Pressable style={toolbarStyle.button} onPress={validateInput}>
            <View style={toolbarStyle.button}>
              <Text style={toolbarStyle.buttonText}>Add New</Text>
            </View>
          </Pressable>
        </View>
        {addCategory()}
        <View style={toolbarStyle.row}>
          <View style={toolbarStyle.header}>
            <Text style={toolbarStyle.headerText}>{props.title}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

Toolbar.propTypes = {
  addText: PropTypes.string.isRequired,
  addTextLocation: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  removeCategory: PropTypes.func.isRequired,
  removeLocation: PropTypes.func.isRequired,
  renameCategory: PropTypes.func.isRequired,
  renameLocation: PropTypes.func.isRequired,
  onChangeTextLocation: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onUnSelectedCategory: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
};
