import firebase from 'firebase/compat/app';
import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import './login.scss';

const Login: React.FC = () => {
    const uiConfig = {
        signInFlow: 'redirect',
        signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
        signInSuccessUrl: '/brands',
    };


    return (
        <div className="login">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
};

export default Login;

