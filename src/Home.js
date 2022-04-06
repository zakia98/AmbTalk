import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ChatHistory from './components/ChatHistory/ChatHistory';
import { SignInScreen, startFirebase, app, currentUser } from './firebaseConfig';
import {getFirestore} from 'firebase/firestore'
import App from './App';
import { readUserDatabase, addUserDataToDatabase, grabUserMessages, pushUserMessage } from './firebasehelpers';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const [userData, setUserData] = useState(undefined)
  useEffect(() => {
    onAuthStateChanged(getAuth(), authStateObserver)
  }, [])

  function authStateObserver(user) {
    if (user) {
      setCurrentUser(user)
      let getUserData = async () => await readUserDatabase(app, user)
      getUserData()
        .then(result => {
          if (result) {
            setUserData(result)
          } else {
            addUserDataToDatabase(app, user)
          }
          grabUserMessages(app, 'mzqHwjbpTtXJOZCfHplV')
          pushUserMessage(app, 'mzqHwjbpTtXJOZCfHplV', {time:'3pm', uid:'tsHR1lmPmUhFcQ8McgAehSzRBbs1', chatMessage:'Where the honeys at'})
        })
        .catch(error => console.log(error))
    } else {
      setCurrentUser(getAuth().currentUser)
    }
  }



  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currentUser={currentUser}></NavBar>
        <Routes>
          <Route path='/' exact element={<SignInScreen />} />
          <Route path='/chat-history' element={<ChatHistory />}></Route>
          <Route path='/app' element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Home;
