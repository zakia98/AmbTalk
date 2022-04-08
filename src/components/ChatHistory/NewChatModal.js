import { useEffect, useState } from 'react'
import './NewChatModal.css'
import { searchByUsername } from '../../firebasehelpers'
import UsersBox from './UsersBox'
import { currentUser } from '../../firebaseConfig'

export default function NewChatModal(props) {

    const [input, updateInput] = useState(null)
    const [searchResultsList, updateSearchResults] = useState([])

    function handleChange(e) {
        updateInput(prevState => e.target.value)
    }

    useEffect(() => {
        searchByUsername(input).then(result => updateSearchResults(result))
    }, [input])
    
    

    const searchResults = searchResultsList ? searchResultsList.map(
        result => <UsersBox name={result.name} username={result.username} key={result.username} currentUser={props.currentUser}/>
    )  : null
    
    return(
        <div className="newchat popup">
            <button className="close button" onClick={() => props.closeModal(false)}>close</button>
            <form onSubmit={(e) => e.preventDefault()}>
                Search for a User:
                <input type='text' onChange={handleChange}></input>
            </form>
            <div className='user list'>
                {searchResults}
            </div>
        </div>
    )
}