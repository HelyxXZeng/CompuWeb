import 'firebase/compat/auth'
import { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import { DarkModeContext } from './context/darkModeContext'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Single from './pages/single/Single'
import './styles/dark.scss'
import firebase from 'firebase/compat/app'
import { AppRouter, Status } from './routes/AppRouter'
import staffApi from './api/staffApi'


function App() {

  // Configure Firebase.
  const config = {
    apiKey: 'AIzaSyCsSCvp3dU9D3dZzY38nOC_uET4rOfIwvE',
    authDomain: 'hitechshop-adc0d.firebaseapp.com',
    // ...
  };
  firebase.initializeApp(config);

  // Listen to the Firebase Auth state and set the local state.
  // const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
  //     if (!user) {
  //       // user log out, handle here
  //       console.log('User does not log in');
  //       return;
  //     }
  //     // console.log('Logged in, user:', user.phoneNumber);
  //     // const token = await user.getIdToken();
  //     // console.log('Logged in, token:', token);
  //   });
  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  const { darkMode } = useContext(DarkModeContext)

  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <AppRouter />
      </div>
    </>
  )
}

export default App
