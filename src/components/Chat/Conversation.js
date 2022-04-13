import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { listenForMessageUpdates, pushUserMessage } from "../../firebasehelpers"
import Message from "./Message"
import './Conversation.css'
import MessageBar from "./MessageBar"

export default function Conversation(props) {

    //obtains the conversation id from the URL
    const { convoID } = useParams() 
    const [conversation, setConversation] = useState(null) 

    const [newMessage, updateMessage] = useState({value:''}) 

    const endDivRef = useRef(null)

    useEffect(() => {
        function scrollToBottom() {
            endDivRef.current.scrollIntoView({behaviour: 'smooth' })
        }
        scrollToBottom()
    }, [conversation])

    const handleChange = (e) => {
        e.preventDefault()
        updateMessage({value:e.target.value})
    }

    const sendMessage = (e) => {
        e.preventDefault()
        pushUserMessage(convoID, newMessage.value, props.currentUser.uid)
        updateMessage({value:''})
    }

    useEffect(() => {
        listenForMessageUpdates(convoID, setConversation)

    }, [])

    

    const messages = conversation ? conversation.messages.map((message, index) => {
        
        return <Message message={message} currentUser={props.currentUser}key={index}/>
    }) : null

    window.scrollTo(0, document.body.scrollHeight)


    return(
        <div className="conversation">
            {messages}
            <MessageBar handleChange={handleChange} sendMessage={sendMessage}/>
            <div ref={endDivRef}></div>
        </div>
    )
}