import * as firebase from 'firebase/app';
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyAit3iCGmlWuq0TANrfchRqzFYg-SjhMcc",
    authDomain: "music-player-v.firebaseapp.com",
    databaseURL: "https://music-player-v-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "music-player-v",
    storageBucket: "music-player-v.appspot.com",
    messagingSenderId: "318425808379",
    appId: "1:318425808379:web:ea9db285d4759f1d849f5e",
    measurementId: "G-VLV61M37QL"
  };

const app = firebase.initializeApp(firebaseConfig);
export const database = getDatabase();
export default firebase;
