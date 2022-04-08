//This is an individual chat, which when clicked will open the chat history for that individiual.

import placeholderuser from './placeholder_user.svg'
import Icon from './Icon'
import './chat.css'
import { useState } from 'react'
import { readUserDatabase } from '../../firebasehelpers'
import { app } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'

export default function Chat(props) {
    
    const navigate = useNavigate()

    const [otherUserName, updateOther] = useState('')
    
    readUserDatabase(app, props.otherUserUID).then(result => {
        updateOther(result.name)
    })

    function openChat() {
        navigate(`/chat/${props.chatID}`)
    }

    return(
        <div className='chat' onClick={openChat}>
            <Icon icon={placeholderuser}></Icon>
            <div className='chat-info'>
                <h3 className='user-name'>{otherUserName}</h3>
                <p className='chat-history'>{props.lastMessage}</p>
            </div>
        </div>
    )
}