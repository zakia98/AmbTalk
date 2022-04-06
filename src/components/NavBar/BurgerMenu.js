import React, { useState } from 'react';
import burgericon from './menu_black_24dp.svg'
import { useNavigate } from 'react-router-dom'
import './BurgerMenu.css'
import {getAuth} from 'firebase/auth';

export default function BurgerMenu(props) {
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/app')
    }

    return(
        <img onClick={handleClick} className="burger-menu" src={burgericon}></img>
    )
}  