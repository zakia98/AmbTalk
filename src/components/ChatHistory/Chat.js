//This is an individual chat, which when clicked will open the chat history for that individiual.

import placeholderuser from './placeholder_user.svg'
import Icon from './Icon'
import './chat.css'
import { useEffect, useState } from 'react'
import { readUserDatabase } from '../../firebasehelpers'
import { app } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'


export default function Chat(props) {
    
    const navigate = useNavigate()

    useEffect(() => {
        readUserDatabase(app, props.otherUserUID). then( result => {
            updateOther(result.name);
            setURL(result.profilePicURL)
        })
    }, [])

    const [otherUserName, updateOther] = useState('')
    const [profilePicURL, setURL] = useState(null)
 

    function openChat() {
        props.toggleInChat(true)
        navigate(`/chat/${props.chatID}`)
    }

    const style={
        height:'50px',
        width:'50px',
        borderRadius:'50%',
    }

    const profilePic = profilePicURL ?  <img src={profilePicURL} style={style}/> : <img src={placeholderuser} style={style}/> 

    return(
        <div className='chat' onClick={openChat}>
            <div className='profile-pic'>{profilePic}</div>
            <div className='chat-info'>
                <h3 className='user-name'>{otherUserName}</h3>
                <p className='chat-history'>{props.lastMessage}</p>
            </div>
        </div>
    )
}