import React, {useContext} from 'react';
import {LoginScreen} from './Screens/LoginScreen';
import {RegisterScreen} from './Screens/RegisterScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './context/AuthContext';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {currentUser} = useContext(AuthContext);
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Sign up'}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{title: 'Register'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
