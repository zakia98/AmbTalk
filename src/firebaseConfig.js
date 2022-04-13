// Import the functions you need from the SDKs you need
import { onAuthStateChanged, getAuth } from "firebase/auth";
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

const auth = getAuth()
let currentUser = getAuth().currentUser

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: `/chat-history`,
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
    
    return (
      <div>
        <h1>Welcome to MangoTalk!</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
  );
}




  
export { SignInScreen, app, currentUser, auth }