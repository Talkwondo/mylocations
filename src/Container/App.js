import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import {changeText, changeCategory, selectCategory} from '../Reducers/reducer';
import Home from './Home';

const rootReducer = combineReducers({
  changeText,
  changeCategory,
  selectCategory,
});

const store = createStore(rootReducer, applyMiddleware(logger));

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2d2d2d',
  },
});

export default App;
