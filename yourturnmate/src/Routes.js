import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './context/AuthContext';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase/firebaseConfig';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

export const Routes = () => {
  const {currentUser} = useContext(AuthContext);

  console.log(currentUser, 'is authenticated ?');

  return (
    <NavigationContainer>
      {currentUser == null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};
