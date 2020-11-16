import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  centeredFlexContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centerAlignedContainer: {
    alignItems: 'center',
  },
  centeredContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#5ca6f7',
  },
  loadingSpinnerFlexContainer: {
    flex: 1,
    backgroundColor: '#5ca6f7',
  },
  screenHeader: {
    backgroundColor: '#5ca6f7',
    elevation: 0,
  },
  appTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: -50,
  },
  appTitle: {
    color: 'white',
    top: -15,
    fontSize: 70,
    fontFamily: 'sans-serif-light',
  },
  appTitleImage: {
    left: 7,
  },
  buttonPrimary: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
    letterSpacing: 0.5,
  },
  buttonPrimaryText: {
    color: '#2b90ff',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  errorsContainer: {
    width: '100%',
    top: -25,
    marginLeft: 25,
  },
  errorText: {
    color: '#ff302b',
  },
  fullWidth: {
    width: '100%',
  },
  relativeFlexContainer: {
    flex: 1,
  },
  svgWave: {
    position: 'absolute',
    top: 220,
  },
  curvedBackgroundContainer: {
    position: 'absolute',
    width: '100%',
  },
  svgContainer: {
    height: 240,
    backgroundColor: '#5ca6f7',
  },
  bottomSheetHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 0.5,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  panelHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20
  },
  panelHandle: {
    width: 35,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  bottomSheetContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 5,
    height: '100%',
  },
});

export default appStyles;
