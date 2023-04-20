
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import {initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyC2QLeuL-iHxFoxVb_uVFsEdWk9P4rag8Q',
  authDomain: 'passwordmanager-5f683.firebaseapp.com',
  databaseURL: 'https://passwordmanager-5f683-default-rtdb.firebaseio.com',
  projectId: 'passwordmanager-5f683',
  storageBucket: 'passwordmanager-5f683.appspot.com',
  messagingSenderId: '557973998779',
  appId: 'app-1-557973998779-ios-c124f27107754742e12d9e',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const auth = getAuth(app);

const db = getFirestore(app);

export {auth, db};

// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
// });

// const auth = firebase.auth();
