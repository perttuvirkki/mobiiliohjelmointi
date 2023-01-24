import React, {useContext} from 'react';
import ChatsScreen from './Screens/ChatsScreen';
import SearchScreen from './Screens/SearchScreen';
import {AuthContext} from './context/AuthContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const {currentUser} = useContext(AuthContext);
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{title: 'Chats'}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Search'}}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
