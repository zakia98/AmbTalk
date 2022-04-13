import getMinutes from "date-fns/getMinutes"
import getHours from "date-fns/getHours"
import { useEffect, useState } from "react"
import { readUserDatabase } from "../../firebasehelpers"
import placeholderuser from '../ChatHistory/placeholder_user.svg'
import { app } from "../../firebaseConfig"

export default function Message(props) {

    const [profilePicURL, setURL] = useState(null)

    const messagecontent = props.message.chatMessage
    const messageTime = props.message.time.toDate().toLocaleTimeString().substr(0,5)
    const messagetype = props.message.uid == props.currentUser.uid ? 'message' : 'message partner'


    useEffect(() => {
        readUserDatabase(app, props.message.uid).then(result => {
            setURL(result.profilePicURL)
        }).catch(
            error => console.log(error)
        )
            
        //change status to read on message load

        }, [])
    
    
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