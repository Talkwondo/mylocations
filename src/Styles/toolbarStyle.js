import {StyleSheet} from 'react-native';

export const toolbarStyle = StyleSheet.create({
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
