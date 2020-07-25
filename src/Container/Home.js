import React, {useEffect} from 'react';
import {StyleSheet, FlatList, View, Alert} from 'react-native';
import Card from '../Components/Card';
import Toolbar from './Toolbar';
import {connect} from 'react-redux';
import {actionCategory} from '../Actions/actions';
import AsyncStorage from '@react-native-community/async-storage';

const mapStateToProps = (state) => {
  return {
    categories: state.changeCategory.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (categories) => dispatch(actionCategory(categories, 'update')),
  };
};
const Home = (props) => {
  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorage.getItem('@categories');
        const categories = JSON.parse(storage);
        props.update(categories);
      } catch {
        Alert.alert('Somting wrong in phone storage');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(
          '@categories',
          JSON.stringify(props.categories),
        );
      } catch (e) {
        Alert.alert(`${e}`);
      }
    })();
  }, [props.categories]);

  const renderItem = ({item, index}) => <Card category={item} id={index} />;

  return (
    <>
      <View style={styles.container}>
        <Toolbar />
        <FlatList
          style={styles.list}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          data={props.categories}
          extraData={props.categories}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
