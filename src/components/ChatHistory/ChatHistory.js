import { grabUserMessages, readUserDatabase } from "../../firebasehelpers";
import Chat from "./Chat";
import { app } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import NewChatModal from "./NewChatModal";


export default function ChatHistory(props) {
    
    const [recentChats, setChats] = useState([])
    const [showNewChatBox, toggleNewChat] = useState(false)
    useEffect(() => {
        
        if (props.currentUser) {
            readUserDatabase(app, props.currentUser.uid).then(result => {
                const chats = []
                result.chats.forEach(chatID => {
                        grabUserMessages(app, props.currentUser.uid).then(message => {
                        chats.push(message)
                    })
                })
                setChats(chats)
            })    
        }
    }, [props.currentUser])

    useEffect(() => {

    }, [recentChats])

    const startNewChat = () => {
        toggleNewChat(true)
    }

    return(
        <div>
            <div className='startNewChat chat' onClick={startNewChat}>
                Start a new chat...
            </div>
            <Chat name={'Amina'} lastMessage={'miss you...'}></Chat>
            <Chat name={'Charlotte'} lastMessage={'Yo where you at'}></Chat>
            <Chat name={'Danica'} lastMessage={'We still on for tonight??'}></Chat>
            <Chat name={'Emily'} lastMessage={'You have a side hoe????'}></Chat>
            {showNewChatBox ? <NewChatModal closeModal={toggleNewChat}/> : null}
        </div>
    )
}