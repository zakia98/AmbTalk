//This is an individual chat, which when clicked will open the chat history for that individiual.

import placeholderuser from './placeholder_user.svg'
import Icon from './Icon'
import './chat.css'

export default function Chat(props) {
    return(
        <div className='chat'>
            <Icon icon={placeholderuser}></Icon>
            <div className='chat-info'>
                <h3 className='user-name'>{props.name}</h3>
                <p className='chat-history'>{props.lastMessage}</p>
            </div>
        </div>
    )
}