import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ChatHistory from './components/ChatHistory/ChatHistory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='chat-history' element={<ChatHistory />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
