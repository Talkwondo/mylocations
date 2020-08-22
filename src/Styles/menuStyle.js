import {StyleSheet, Dimensions} from 'react-native';
const heightScreen = Dimensions.get('screen').height;

export const menuStyle = StyleSheet.create({
  container: {
    height: heightScreen * 0.075,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#00E5D1',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 0,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#864DEB',
    borderRadius: 5,
    paddingVertical: 8,
    marginHorizontal: 5,
    flex: 1,
  },
});
