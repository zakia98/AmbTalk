import React, { useState } from 'react';
import './NavBar.css'
import BurgerMenu from './BurgerMenu';
import Title from './TitleName';


export default function NavBar(props) {
    

    return(
        <div className='nav-bar'>
            <BurgerMenu></BurgerMenu>
            <Title currentChat='All Chats'></Title>
        </div>
    )
}