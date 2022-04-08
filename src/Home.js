import './App.css';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ChatHistory from './components/ChatHistory/ChatHistory';
import { SignInScreen, startFirebase, app, currentUser } from './firebaseConfig';
import {getFirestore} from 'firebase/firestore'
import App from './App';
import { readUserDatabase, addUserDataToDatabase, grabUserMessages, pushUserMessage, addUsersChosenUsernameToDatabase } from './firebasehelpers';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CreateUserName from './components/CreateUsername';
import Conversation from './components/Chat/Conversation';


function Home() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [isFirstLogin, toggleFirst] = useState(false)
  const [userData, setUserData] = useState(undefined)
  const [username, setUsername] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(getAuth(), authStateObserver)
  }, [])

  function authStateObserver(user) {
    if (user) {
      setCurrentUser(user)
      let getUserData = async () => await readUserDatabase(app, user.uid)
      getUserData()
        .then(result => {
          if (result) {
            setUserData(result)
          } else {
            addUserDataToDatabase(app, user)
            toggleFirst(prevState => !prevState)
          }
        })
        .catch(error => console.log(error))
    } else {
      setCurrentUser(getAuth().currentUser)
    }
  }

  const handleChange = (e) => {
    setUsername(prevState => e.target.value)
  }

  const submitUsername = (e) => {
    e.preventDefault();
    
    addUsersChosenUsernameToDatabase(app, currentUser, username)
    toggleFirst(prevState => !prevState)
  }

  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currentUser={currentUser}></NavBar>
        {isFirstLogin ? <CreateUserName handleChange={handleChange} submitUsername={submitUsername}/> : null}
        <Routes>
          <Route path='/' exact element={<SignInScreen />} />
          <Route path='/chat-history' element={<ChatHistory currentUser={currentUser}/>}></Route>
          <Route path='/app' element={<App />}></Route>
          <Route path='/chat/:convoID' element={<Conversation currentUser={currentUser}/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Home;
