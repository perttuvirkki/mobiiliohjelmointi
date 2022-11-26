import {createContext, useEffect, useState} from 'react';
import {auth} from '../../firebase/firebaseConfig';
import {onAuthStateChanged} from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(currentUser.uid);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setIsAuthenticated(true);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{isAuthenticated, currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
