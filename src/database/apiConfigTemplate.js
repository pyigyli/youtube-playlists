import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const YoutubeApiKey = '***';

// Initialize Firebase
const config = {
    apiKey: '***',
    authDomain: '***',
    databaseURL: '***',
    projectId: '***',
    storageBucket: '***',
    messagingSenderId: '***'
};
firebase.initializeApp(config);

export default firebase;