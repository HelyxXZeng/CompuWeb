import React from 'react';
import firebase from 'firebase/compat/app';
import { StyledFirebaseAuth } from 'react-firebaseui';
import staffApi from '../../api/staffApi';
import { Status } from '../../routes/AppRouter';
import './login.scss'

const Login: React.FC = () => {
    const uiConfig = {
        signInFlow: 'redirect',
        signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
        signInSuccessUrl: '/brands',
        // callbacks: {
        //     signInSuccessWithAuthResult: (authResult: any) => {
        //         handleSignInSuccess(authResult, updateStatus);
        //         return false; // Make sure to return false here
        //     },
        // },
    };


    return (
        <div className="login">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
};

export default Login;

