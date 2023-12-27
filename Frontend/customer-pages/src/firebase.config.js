// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: 'AIzaSyAX97vYfHuNVFcVLaUJxB7vw9iKPhDQ71I',
//     authDomain: 'hitechdemo-2eb0f.firebaseapp.com',
//     projectId: 'hitechdemo-2eb0f',
//     storageBucket: 'hitechdemo-2eb0f.appspot.com',
//     messagingSenderId: '920118284780',
//     appId: '1:920118284780:web:5a3abcdb22d2f3e72070c9',
//     measurementId: 'G-S5L1724N3D',
// };

const firebaseConfig = {
    apiKey: 'AIzaSyAjw2rVJVf3n8-pgihzTcRKPM50MiuMYAE',
    authDomain: 'hitech-new.firebaseapp.com',
    projectId: 'hitech-new',
    storageBucket: 'hitech-new.appspot.com',
    messagingSenderId: '17354860440',
    appId: '1:17354860440:web:e1886003f2641da8b5aded',
    measurementId: 'G-CER0K502ZK',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
