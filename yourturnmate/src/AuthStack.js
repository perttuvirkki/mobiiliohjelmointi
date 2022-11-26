import React, {useContext} from 'react';
import {Login} from './Login';
import {Register} from './Register';
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
        name="Login"
        component={Login}
        options={{title: 'Sign up'}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
