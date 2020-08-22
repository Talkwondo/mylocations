import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import {
  changeText,
  changeCategory,
  selectCategory,
} from '../Reducers/reducerCategory';
import {
  changeTextLocation,
  changeLocation,
  selectLocation,
} from '../Reducers/reducerLocations';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import 'react-native-gesture-handler';

import Home from './Home';
import Locations from './Locations';

const rootReducer = combineReducers({
  changeText,
  changeCategory,
  selectCategory,
  changeTextLocation,
  changeLocation,
  selectLocation,
});

const Tab = createBottomTabNavigator();

const store = createStore(rootReducer, applyMiddleware(logger));

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="light-content" />
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#00E5D1',
            style: {backgroundColor: '#2d2d2d'},
            labelStyle: {
              fontSize: 20,
            },
          }}
          initialRouteName="Categories">
          <Tab.Screen name="Locations" component={Locations} />
          <Tab.Screen name="Categories" component={Home} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2d2d2d',
  },
});

export default App;
