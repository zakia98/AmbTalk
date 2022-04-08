import { grabUserMessages, readUserDatabase, searchByUsername } from "../../firebasehelpers";
import Chat from "./Chat";
import { app, currentUser } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import NewChatModal from "./NewChatModal";
import { useNavigate, useParams } from "react-router-dom";


export default function ChatHistory(props) {
    

    const [recentChats, setChats] = useState([])
    const [showNewChatBox, toggleNewChat] = useState(false)

    useEffect(() => {
        if (props.currentUser) {
            grabUserMessages(app, props.currentUser.uid).then(result => {
                setChats(result)
            })
        }
    }, [props.currentUser])

    useEffect(() => {

    }, [recentChats])

    const startNewChat = () => {
        toggleNewChat(true)
    }

    const getChats = recentChats.length > 1 ? loadChats() : null

    function loadChats() {
        const chats = recentChats.map((chat, index) => {
            const otherUserUID = chat.head.users.allusers.find(element => element != props.currentUser.uid)
            const lastMessage = chat.messages.length > 0 ? 
                chat.messages[chat.messages.length - 1].chatMessage : 'No messages yet'
            const trimmedLastMessage = lastMessage.split("").slice(0,19).join("") + '...'
            return <Chat otherUserUID={otherUserUID} lastMessage={trimmedLastMessage} chatID={chat.head.chatID} key={index}></Chat>
        }) 
        return chats             
    }

    return(
        <div>
            <div className='startNewChat chat' onClick={startNewChat}>
                Start a new chat...
            </div>
            {getChats}
            {showNewChatBox ? <NewChatModal closeModal={toggleNewChat} currentUser={props.currentUser}/> : null}
        </div>
    )
}