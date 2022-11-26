import React, {useContext} from 'react';
import {Home} from './Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from './context/AuthContext';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const {currentUser} = useContext(AuthContext);
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
    </Stack.Navigator>
  );
};

export default AppStack;
