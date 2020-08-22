/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, Pressable, Animated, Alert} from 'react-native';
import {connect} from 'react-redux';
import {
  selectedCategory,
  unSelectedCategory,
  selectedLocation,
  unSelectedLocation,
} from '../Actions/actions';
import PropTypes from 'prop-types';
import {cardStyle} from '../Styles/index';

const widthScreen = Dimensions.get('screen').width;

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectedCategory: (id) => dispatch(selectedCategory(id)),
    onUnSelectedCategory: () => dispatch(unSelectedCategory()),
    onSelectedLocation: (name) => dispatch(selectedLocation(name)),
    onUnSelectedLocation: () => dispatch(unSelectedLocation()),
  };
};

const mapStateToProps = (state) => {
  return {
    selected: state.selectCategory.selected,
    selectedLocation: state.selectLocation.selectedLocation,
  };
};

const Card = (props) => {
  const [loading, setLoading] = useState(false);
  const Animation = useRef(new Animated.Value(-widthScreen)).current;

  const setClass = () => {
    if (props.category) {
      return props.selectedLocation === null
        ? {backgroundColor: 'transparent'}
        : props.selectedLocation === props.cardName
        ? {backgroundColor: '#FFC647'}
        : {backgroundColor: 'transparent'};
    } else {
      return props.selected === null
        ? {backgroundColor: 'transparent'}
        : Number(props.selected) === props.id
        ? {backgroundColor: '#FFC647'}
        : {backgroundColor: 'transparent'};
    }
  };

  const handleClick = (id) => () => {
    if (props.group) {
      return Alert.alert('Can not edit or delete when grouped');
    }
    props.category
      ? !props.selectedLocation
        ? props.onSelectedLocation(props.cardName)
        : props.onUnSelectedLocation()
      : !props.selected
      ? props.onSelectedCategory(id)
      : props.onUnSelectedCategory();
  };

  const categoryText = () =>
    props.category && !props.group ? (
      <>
        <Text style={cardStyle.categorySubName}> {props.category}</Text>
        <Pressable
          style={{alignSelf: 'center'}}
          onPress={() => props.setMapLocation(props.cardName)}>
          <Text style={cardStyle.mapText}>Show on Map</Text>
        </Pressable>
      </>
    ) : props.category ? (
      <Text style={cardStyle.categorySubName}> {props.category}</Text>
    ) : null;
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      Animated.timing(Animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Animated.View style={{transform: [{translateX: Animation}]}}>
      <View style={[cardStyle.border, setClass()]}>
        <Pressable onPress={handleClick(props.id)}>
          <View style={cardStyle.container}>
            <View style={cardStyle.row}>
              <Text style={cardStyle.categoryName}>{props.cardName}</Text>
              {categoryText()}
            </View>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  ) : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

Card.propTypes = {
  category: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  id: PropTypes.number.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  onSelectedCategory: PropTypes.func.isRequired,
  onUnSelectedCategory: PropTypes.func.isRequired,
};
