import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { uid } from './firebaseConfig'
export default function App() {

    const navigate = useNavigate()

    const logOut = () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            navigate('/')

        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className='options'>
            <div className='options-button' onClick={() => navigate('/chat-history')}>
                Chat History
            </div> 
            <div className='options-button' onClick={logOut}>
                Sign Out        
            </div> 
            
        </div>
    )
}