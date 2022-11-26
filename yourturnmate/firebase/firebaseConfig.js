// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeFirestore, getDocs, collection} from 'firebase/firestore';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import {getStorage} from 'firebase/storage';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDT6f_BvHiu5ilj_K1KyHTbG4aqq4cBkpk',
  authDomain: 'yourturnmate.firebaseapp.com',
  projectId: 'yourturnmate',
  storageBucket: 'yourturnmate.appspot.com',
  messagingSenderId: '562246398224',
  appId: '1:562246398224:web:6ec43845f8600a93cef595',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
