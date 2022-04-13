import {listenForChatUpdates } from "../../firebasehelpers";
import ChatHead from "./Chat";
import { useEffect, useState } from "react";
import NewChatModal from "./NewChatModal";


export default function ChatHistory(props) {
    const [recentChats, setChats] = useState([])
    const [showNewChatBox, toggleNewChat] = useState(false)

    useEffect(() => {
        //When current user updates creates a listener for whenever chat information 
        // in the database changes.
        if (props.currentUser) {
            listenForChatUpdates(props.currentUser.uid, setChats)
        }
    }, [props.currentUser])

    const startNewChat = () => {
        //toggles variable to show new chat box. 
        toggleNewChat(true)
    }

    const getChats = recentChats.length > 0 ? loadChats() : null

    function loadChats() {
        const chats = recentChats.map((chat, index) => {
            const otherUserUID = chat.head.users.allusers.find(element => element != props.currentUser.uid)
            const lastMessage = chat.messages.length > 0 ? 
                chat.messages[chat.messages.length - 1].chatMessage : 'No messages yet'
            const trimmedLastMessage = lastMessage.split("").slice(0,19).join("") + '...'
            return <ChatHead otherUserUID={otherUserUID} lastMessage={lastMessage.length > 10 
                ? trimmedLastMessage : lastMessage} chatID={chat.head.chatID} key={index} toggleInChat={props.toggleInChat}></ChatHead>
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