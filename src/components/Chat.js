import {ReactComponent as Rocket} from '../assets/just-rocket.svg';
import { FiPaperclip } from "react-icons/fi";

const autoGrow = (e) => {
  e.target.style.height = '16px';
  // e.target.style.maxHeight = '100px';
  e.target.style.height = e.target.scrollHeight+'px';
}

const Chat = ({name, chatId = 0}) => {

  let userMsg = 'Hi there! How are you?';
  let compMsg = 'Hi! I am fine, what\'s up?';

  return (
    <div className="chat">
      <div className="chat-head">{name}</div>
      <div className="messages">
        <div className="userMsg">{userMsg}</div>
        <div className="compMsg">{compMsg}</div>
      </div>
      <div  className="chat-tail">
        <form>
          <button id="submit-image"><FiPaperclip /> </button>
        </form>
        <form className='form-text'>
          <textarea onInput={autoGrow} minLength={1} maxLength={500}></textarea>
          <button id="submit" aria-label="send" title="send"> <Rocket /> </button>
        </form>
      </div>

    </div>
  )
}

export default Chat;