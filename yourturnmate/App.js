import React, {useContext} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {Routes} from './src/Routes';
import {AuthContextProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
