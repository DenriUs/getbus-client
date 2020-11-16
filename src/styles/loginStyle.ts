import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'center',
    width: '80%',
  },
  registerQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerQuestionText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  registerButtonText: {
    letterSpacing: 0.5,
  },
  formInput: {
    marginBottom: 30,
  },
});

export default loginStyles;
