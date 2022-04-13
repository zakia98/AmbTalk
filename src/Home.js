import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ChatHistory from './components/ChatHistory/ChatHistory';
import { SignInScreen, app } from './firebaseConfig';
import App from './App';
import { readUserDatabase, addUserDataToDatabase, addUsersChosenUsernameToDatabase } from './firebasehelpers';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CreateUserName from './components/CreateUsername';
import Conversation from './components/Chat/Conversation';


function Home() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [isFirstLogin, toggleFirst] = useState(false)
  const [username, setUsername] = useState(undefined)
  const [isInChat, toggleInChat] = useState(false)

  useEffect(() => {
    onAuthStateChanged(getAuth(), authStateObserver)
  }, [])

  function authStateObserver(user) {
    if (user) {
      setCurrentUser(user)
      readUserDatabase(app, user.uid)
        .then(result => {
          if (!result) {
            //if user doesn't exist:
            addUserDataToDatabase(app, user)
            toggleFirst(prevState => !prevState)
          }
        }).catch(
          error => console.log(error)
        )
    } else {
      setCurrentUser(getAuth().currentUser)
    }
  }

  const handleChange = (e) => {
    //handle change function for new user username form
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
        <NavBar currentUser={currentUser} isInChat={isInChat} toggleInChat={toggleInChat}></NavBar>
        {isFirstLogin ? <CreateUserName handleChange={handleChange} submitUsername={submitUsername}/> : null}
        <Routes>
          <Route path='/' exact element={<SignInScreen />} />
          <Route path='/chat-history' element={<ChatHistory currentUser={currentUser} toggleInChat={toggleInChat}/>}></Route>
          <Route path='/app' element={<App />}></Route>
          <Route path='/chat/:convoID' element={<Conversation currentUser={currentUser}/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Home;
