import React, { useState } from 'react'
import { ReactComponent as Rocket } from '../../assets/just-rocket.svg';
import { FiPaperclip } from "react-icons/fi";
import { database } from '../../firebase';

const autoGrow = (e) => {
  e.target.style.height = '16px';
  e.target.style.height = e.target.scrollHeight+'px';
}

export default function ChatInput({chatId, currentUser, displayName}) {
  const [textMsg, setTextMsg] = useState('');

  const trackTextMsg = (e) => {
    setTextMsg(e.target.value);
  }

  const sendMsg = async (e) => {
    e.preventDefault();
    if (textMsg !== '') {
      setTextMsg('');
      database.saveMsgToGroup(chatId, textMsg, currentUser, displayName);
    }
  }

  const submitEnter = (e) => {
    if (e.key === 'Enter') {
      sendMsg(e);
    }
  }

  return (
  <div className="chat-tail-container">
  <div  className="chat-tail">
    <form>
      <button id="submit-image" onClick={(e)=>{e.preventDefault();}}><FiPaperclip /> </button>
    </form>
    <form className='form-text'>
      <textarea onInput={autoGrow} minLength={1} maxLength={500} value={textMsg} onChange={trackTextMsg} onKeyDown={submitEnter}></textarea>
      <button id="submit" aria-label="send" title="send" onClick={sendMsg}> <Rocket /> </button>
    </form>
  </div>
  </div>
  )

}
