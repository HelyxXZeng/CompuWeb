import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import './App.css'
import { DarkModeContext } from './context/darkModeContext'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Login from './pages/login/Login'
import Single from './pages/single/Single'
import './styles/dark.scss'



// if (!isSignedIn) {
//   return (
//     <div>
//       <h1>My App</h1>
//       <p>Please sign-in:</p>
//       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//     </div>
//   );
// }

function App() {

  // Configure Firebase.
  const config = {
    apiKey: 'AIzaSyCsSCvp3dU9D3dZzY38nOC_uET4rOfIwvE',
    authDomain: 'hitechshop-adc0d.firebaseapp.com',
    // ...
  };
  firebase.initializeApp(config);

  // Listen to the Firebase Auth state and set the local state.
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      // setIsSignedIn(!!user);

      if (!user) {
        // user log out, handle here
        console.log('User does not log in')
        return
      }
      console.log('Logged in, user:', user.displayName);
      const token = await user.getIdToken();
      console.log('Logged in, token:', token)
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const { darkMode } = useContext(DarkModeContext)

  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="customers">
                <Route index element={<List type='customer' />} />
                <Route path=":customerId" element={<Single type='customer' isNew='update' />} />
                <Route path="new" element={<Single type='customer' isNew='new' />} />
              </Route>
              <Route path="products">
                <Route index element={<List type='product' />} />
                <Route path=":productId" element={<Single type='product' isNew='update' />} />
                <Route path="new" element={<Single type='product' isNew='new' />} />
              </Route>
              <Route path="categories">
                <Route index element={<List type='category' />} />
                <Route path=":categoryId" element={<Single type='category' isNew='update' />} />
                <Route path="new" element={<Single type='category' isNew='new' />} />
              </Route>
              <Route path="orders">
                <Route index element={<List type='order' />} />
                <Route path=":orderId" element={<Single type='order' isNew='update' />} />
                <Route path="new" element={<Single type='order' isNew='new' />} />
              </Route>
              <Route path="brands">
                <Route index element={<List type='brand' />} />
                <Route path=":brandId" element={<Single type='brand' isNew='update' />} />
                <Route path="new" element={<Single type='brand' isNew='new' />} />
              </Route>
              <Route path="promotions">
                <Route index element={<List type='promotion' />} />
                <Route path=":promotionId" element={<Single type='promotion' isNew='update' />} />
                <Route path="new" element={<Single type='promotion' isNew='new' />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
