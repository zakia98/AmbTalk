import './UsersBox.css'
import { checkIfChatBetweenUsersExists, createNewChat, searchByUsername } from '../../firebasehelpers'
import { useNavigate } from 'react-router-dom'

export default function UsersBox(props) {

    const navigate = useNavigate()

    function chooseUser() {
        // we want to first check if the user is already in a chat with them.
        searchByUsername(props.username).then(result => {
            const otheruser = result[0]
            checkIfChatBetweenUsersExists(otheruser.uid, props.currentUser.uid).then(chatData => {
                if (!chatData) {
                    createNewChat(otheruser.uid, props.currentUser.uid).then(newChatID => {
                        navigate(`/chat/${newChatID}`)
                    }).catch(
                        error => console.log(error)
                    )
                } else {
                    navigate(`/chat/${chatData.head.chatID}`)
                }
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }

    return(
        <div className="user-box" onClick={chooseUser}>
            <h4 className='user-title'>{props.name} {props.username}</h4>
        </div>
    )
}