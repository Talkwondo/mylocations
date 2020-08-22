import {StyleSheet, Dimensions} from 'react-native';
const heightScreen = Dimensions.get('screen').height;

export const cardStyle = StyleSheet.create({
  container: {
    flex: 1,
    height: heightScreen * 0.085,
    justifyContent: 'center',
    // alignItems: 'flex-start',
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
    alignSelf: 'center',
    color: 'white',
  },
  categorySubName: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  mapText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  border: {
    borderWidth: 1,
    borderColor: '#00E5D1',
    marginHorizontal: 10,
  },
});
