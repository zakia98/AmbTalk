import React, { useState, useEffect } from 'react';
import './NavBar.css'
import BurgerMenu from './BurgerMenu';
import Title from './TitleName';
import { getAuth } from 'firebase/auth';

export default function NavBar(props) {
    
    const userid = props.currentUser ? props.currentUser.uid : null

    return(
        <div className='nav-bar'>
            <BurgerMenu></BurgerMenu>
            <Title currentChat='All Chats'></Title>
            <p>{userid}</p>
            
        </div>
    )
}