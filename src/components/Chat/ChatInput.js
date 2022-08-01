import React, { useState } from 'react'
import {ReactComponent as Rocket} from '../../assets/just-rocket.svg';
import { FiPaperclip } from "react-icons/fi";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const uid = "HgIDzpvU9xhV8x28rDjWCH1xQxx2";

const autoGrow = (e) => {
  e.target.style.height = '16px';
  // e.target.style.maxHeight = '100px';
  e.target.style.height = e.target.scrollHeight+'px';
}

const getUserNamePhoto = () => {
  const user = auth.currentUser;
  console.log('user tokens are equal: ', user.uid === uid);
  const name = user.displayName;
  const photoURL = user.photoURL;
  return {name, photoURL};
}

export default function ChatInput() {
  const [textMsg, setTextMsg] = useState('');

  const trackTextMsg = (e) => {
    setTextMsg(e.target.value);
  }

  const sendMsg = async (e) => {
    e.preventDefault();
    if (textMsg !== '') {
      setTextMsg('');
      console.log(textMsg);
      try {
        await addDoc(collection(db, 'chats', 'chat1', 'messages'), {
          ...getUserNamePhoto(),
          text: textMsg,
          timestamp: serverTimestamp()
        });
      } catch (error) {
        console.log('Error when writing new message to Firebase Database', error);
      }
    }
  }

  const submitEnter = (e) => {
    if (e.key === 'Enter') {
      sendMsg(e);
    }
  }

  return (
    <div  className="chat-tail">
    <form>
      <button id="submit-image" onClick={(e)=>{e.preventDefault();}}><FiPaperclip /> </button>
    </form>
    <form className='form-text'>
      <textarea onInput={autoGrow} minLength={1} maxLength={500} value={textMsg} onChange={trackTextMsg} onKeyDown={submitEnter}></textarea>
      <button id="submit" aria-label="send" title="send" onClick={sendMsg}> <Rocket /> </button>
    </form>
  </div>
  )

}
