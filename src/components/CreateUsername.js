import './CreateUsername.css'

export default function CreateUserName(props) {
    


    return(
        <div className="create-username popup">
            <form className="create-username-form" onSubmit={props.submitUsername}>
                <label>Please enter your desired username:
                    <input type='text' onChange={props.handleChange} className='username-field'></input>
                    <button type='submit' onClick={props.submitUsername}>Submit</button>
                </label>
            </form>
        </div>
    )
}