

export default function MessageBar(props) {

    function onSend(e) {
        props.sendMessage(e)
        document.querySelector('.message-input').value = ''
    }
    
    
    return(
        <form onSubmit={onSend} className='message-bar'>
            <input type='text' className='message-input' onChange={props.handleChange}></input>
            <button className='send button' onClick={onSend}>Send</button>
        </form>
    )
}
