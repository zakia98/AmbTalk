import './UsersBox.css'

export default function UsersBox(props) {

    return(
        <div className="user-box">
            <h4 className='user-title'>{props.name}</h4>
        </div>
    )
}