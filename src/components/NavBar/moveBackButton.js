import { useNavigate } from 'react-router-dom'
import backicon from '../../icons/arrow-left.svg'

export default function MoveBackButton(props) {
    
    const navigate = useNavigate()

    const handleClick = () => {
        props.toggleInChat(false)
        navigate('/chat-history')
    }
    return(
        <img onClick={handleClick} className="burger-menu" src={backicon}></img>
    )
}