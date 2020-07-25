import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import {selectedCategory, unSelectedCategory} from '../Actions/actions';

const heightScreen = Dimensions.get('screen').height;
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

  const handleClick = (id) => {
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
      <View style={[styles.border, setClass()]}>
        <Pressable onPress={() => handleClick(props.id)}>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.categoryName}>{props.category}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: heightScreen * 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  border: {
    borderWidth: 1,
    borderColor: '#00E5D1',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
