import React, { useState, useEffect } from 'react';
import './NavBar.css'
import BurgerMenu from './BurgerMenu';
import MoveBackButton from './moveBackButton';
import Title from './TitleName';
import { getAuth } from 'firebase/auth';

export default function NavBar(props) {
    

    return(
        <div className='nav-bar'>
            {props.isInChat ? <MoveBackButton toggleInChat={props.toggleInChat}/> : <BurgerMenu />}
            <Title currentChat='All Chats'></Title>
            
        </div>
    )
}