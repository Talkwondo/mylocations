import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, Pressable, Animated} from 'react-native';
import {connect} from 'react-redux';
import {selectedCategory, unSelectedCategory} from '../Actions/actions';
import PropTypes from 'prop-types';
import {cardStyle} from '../Styles/index';

const widthScreen = Dimensions.get('screen').width;

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectedCategory: (id) => dispatch(selectedCategory(id)),
    onUnSelectedCategory: () => dispatch(unSelectedCategory()),
  };
};

const mapStateToProps = (state) => {
  return {
    selected: state.selectCategory.selected,
  };
};

const Card = (props) => {
  const [loading, setLoading] = useState(false);
  const Animation = useRef(new Animated.Value(-widthScreen)).current;

  const setClass = () => {
    return props.selected === null
      ? {backgroundColor: 'transparent'}
      : Number(props.selected) === props.id
      ? {backgroundColor: '#FFC647'}
      : {backgroundColor: 'transparent'};
  };

  const handleClick = (id) => () => {
    !props.selected
      ? props.onSelectedCategory(id)
      : props.onUnSelectedCategory();
  };

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
              <Text style={cardStyle.categoryName}>{props.category}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  ) : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

Card.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  onSelectedCategory: PropTypes.func.isRequired,
  onUnSelectedCategory: PropTypes.func.isRequired,
};
