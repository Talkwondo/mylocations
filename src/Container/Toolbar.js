/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {
  actionCategory,
  changeText,
  unSelectedCategory,
} from '../Actions/actions';

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
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        <View style={styles.column}>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder={'Edit Category...'}
              placeholderTextColor="grey"
              autoCorrect={false}
              value={props.addText}
              autoCapitalize="none"
              onChangeText={props.onChangeText}
              onSubmitEditing={changeName}
            />
            <Pressable onPress={changeName}>
              <View style={[styles.buttonYellow, {width: 150}]}>
                <Text style={styles.buttonText}>Edit Name</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.row}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Category List</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return props.selected ? (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Category</Text>
      <View style={styles.column}>
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', marginHorizontal: 20},
          ]}>
          <Pressable onPress={() => setEdit(true)}>
            <View style={styles.buttonYellow}>
              <Text style={styles.buttonText}>Edit Name</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => onRemoveCategory()}>
            <View style={styles.buttonRed}>
              <Text style={styles.buttonText}>Delete Category</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.row}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Category List</Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.column}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={'Add Category...'}
            placeholderTextColor="grey"
            autoCorrect={false}
            value={props.addText}
            autoCapitalize="none"
            onChangeText={props.onChangeText}
            onSubmitEditing={validateInput}
          />
          <Pressable style={styles.button} onPress={validateInput}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add New</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.row}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Category List</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  input: {
    flex: 1,
    marginHorizontal: 20,
    borderColor: 'gray',
    paddingLeft: 5,
    borderWidth: 1,
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 10,
  },
  button: {
    marginRight: 10,
    backgroundColor: '#864DEB',
    borderRadius: 5,
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  buttonYellow: {
    marginRight: 10,
    backgroundColor: '#FFC647',
    borderRadius: 5,
    paddingVertical: 6,
    width: 180,
  },
  buttonRed: {
    marginRight: 10,
    backgroundColor: '#FF4C3B',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    height: 40,
    backgroundColor: '#00E5D1',
  },
  headerText: {
    fontSize: 25,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
