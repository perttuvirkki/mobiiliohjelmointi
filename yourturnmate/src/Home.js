import React, {useContext} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase/firebaseConfig';
import {AuthContext} from './context/AuthContext';

export const Home = ({navigation}) => {
  const {currentUser} = useContext(AuthContext);

  console.log(currentUser.displayName);

  return (
    <View>
      <Text>Hello {currentUser.displayName}</Text>
      <Button title="Log Off"></Button>
    </View>
  );
};
