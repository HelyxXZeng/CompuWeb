import firebase from "firebase/compat/app";
import "./login.scss"
import { StyledFirebaseAuth } from "react-firebaseui";

const Login = () => {
    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'redirect',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '/'
    };

    return (
        <div className="login">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default Login
