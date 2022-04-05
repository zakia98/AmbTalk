// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC8ENjmtqFdyu_McSNpJSyO09qCwxdfY1s",
  authDomain: "ambtalk-cae13.firebaseapp.com",
  projectId: "ambtalk-cae13",
  storageBucket: "ambtalk-cae13.appspot.com",
  messagingSenderId: "1011214196620",
  appId: "1:1011214196620:web:ae1a2042e10859bc3b00a9"
};

const app = firebase.initializeApp(firebaseConfig)
// Initialize Firebase
function startFirebase() { 
  const app = firebase.initializeApp(firebaseConfig);
  
}



const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: `/app`,
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        return true;
      }
    }
  };
  
function SignInScreen() {
    startFirebase()
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
  );
}


  
export { SignInScreen, startFirebase }