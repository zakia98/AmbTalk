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
                console.log(`Do messages exist?: ${result}`)
                if (!result) {
                    createNewChat(otheruser.uid, props.currentUser.uid).then(newChatID => {
                        navigate(`/chat/${newChatID}`)
                    })
                } else {
                    navigate(`/chat/${chatData.head.chatID}`)
                }
            })
        })
    }

    return(
        <div className="user-box" onClick={chooseUser}>
            <h4 className='user-title'>{props.name} {props.username}</h4>
        </div>
    )
}