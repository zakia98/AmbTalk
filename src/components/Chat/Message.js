import { useEffect, useState } from "react"
import { readUserDatabase } from "../../firebasehelpers"
import placeholderuser from '../ChatHistory/placeholder_user.svg'
import { app } from "../../firebaseConfig"

export default function Message(props) {

    const [profilePicURL, setURL] = useState(null)

    const messagecontent = props.message.chatMessage
    const messageTime = props.message.time.toDate().toLocaleTimeString().substr(0,5)
   
    // if message uid does not equal the current users, it gives it a class which displays it
    //on the other side.
    const messagetype = props.message.uid == props.currentUser.uid ? 'message' : 'message partner'


    useEffect(() => {
        //on message loads sends async request for user profile pic
        readUserDatabase(app, props.message.uid).then(result => {
            setURL(result.profilePicURL)
        }).catch(
            error => console.log(error)
        )}, [])
    
    
    const style = {
        width:'50px',
        height:'50px',
        borderRadius:'50%'
    }

    const profilePic = profilePicURL ? <img className='profile-pic' style={style} src={profilePicURL}/> : <img src={placeholderuser} style={style}/>
    return(
        <div className={messagetype}>
            {profilePic}
            <p>{messagecontent}</p>
            <div className='message-info'>
                <p className='timestamp' >{messageTime}</p>
            </div>
        </div>
    )
}