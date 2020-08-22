import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import MapView from 'react-native-maps';
import Card from '../Components/Card';
import Toolbar from './Toolbar';
import Menu from '../Components/Menu';
import {connect} from 'react-redux';
import {actionLocation} from '../Actions/actions';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import Config from 'react-native-config';

const mapStateToProps = (state) => {
  return {
    locations: state.changeLocation.locations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (locations) => dispatch(actionLocation(locations, 'update')),
  };
};

const Locations = (props) => {
  const [sort, setSort] = useState(false);
  const [group, setGroup] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mapLocation, setMapLocation] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  console.log();

  useEffect(() => {
    (async () => {
      if (mapLocation !== null) {
        try {
          const response = await fetch(
            `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${Config.API_KEY}&searchtext=${mapLocation}`,
          );
          const data = await response.json();
          setLatitude(
            data.Response.View[0].Result[0].Location.MapView.TopLeft.Latitude,
          );
          setLongitude(
            data.Response.View[0].Result[0].Location.MapView.TopLeft.Longitude,
          );
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [mapLocation]);

  useEffect(() => {
    if (latitude !== 0) {
      setModalVisible(true);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorage.getItem('@locations');
        const locations = JSON.parse(storage);
        props.update(locations);
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
          '@locations',
          JSON.stringify(props.locations),
        );
      } catch (e) {
        Alert.alert(`${e}`);
      }
    })();
  }, [props.locations]);

  const renderItem = ({item, index}) => (
    <Card
      setMapLocation={setMapLocation}
      cardName={item.name}
      filterText={filterText}
      category={item.category}
      id={index}
      group={group}
    />
  );

  const setData = () => {
    const arr = [...props.locations];
    if (group) {
      const hash = {};
      for (let obj of props.locations) {
        !hash[obj.category]
          ? (hash[obj.category] = 1)
          : (hash[obj.category] = hash[obj.category] + 1);
      }
      const newArr = [];
      for (let item of Object.entries(hash)) {
        newArr.push({name: item[0], category: item[1]});
      }
      return newArr;
    }
    if (filter) {
      return arr.filter(
        (item) =>
          item.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
      );
    }
    return sort ? arr.sort((a, b) => (a.name > b.name ? 1 : -1)) : arr;
  };

  return (
    <>
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 1,
                  longitudeDelta: 1,
                }}
              />
              <Pressable
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.textModal}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Toolbar
          page="location"
          label="Locations"
          title="Locations List"
          textInputTitle="Add Location"
          editTitleInput="Edit Location..."
          editTitle="Edit Location"
          deleteButtonText="Delete Location"
          filter={filter}
          filterText={filterText}
          setFilterText={setFilterText}
        />
        <Menu
          sort={sort}
          setSort={setSort}
          group={group}
          setGroup={setGroup}
          filter={filter}
          setFilter={setFilter}
        />
        <FlatList
          style={styles.list}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          data={setData()}
          extraData={setData()}
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
    backgroundColor: '#2d2d2d',
  },
  map: {
    height: 300,
    width: 300,
  },
  button: {
    marginTop: 10,
    width: 120,
    height: 30,
    backgroundColor: '#864DEB',
    borderRadius: 5,
    justifyContent: 'center',
  },
  textModal: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2d2d2d',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);

Locations.propTypes = {
  locations: PropTypes.array.isRequired,
};
