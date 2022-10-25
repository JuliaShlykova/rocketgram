import { onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { database } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';
import ChatMessage from './ChatMessage';

export default function ChatBody({ chatId='main' }) {
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();

  useEffect(()=>{
    const q = query(database.groupMessages(chatId),orderBy('sentAt'));
    const cleanUp = onSnapshot(q, snapshot=>{
      // setMessages([]);
      let msgsSnap = [];
      let n = snapshot.docs.length;
      snapshot.docs.forEach((doc,i)=>{
        msgsSnap.push(doc.data());
        // setMessages(msgs=>{
        //   msgs.push(doc.data());
        //   return msgs;
        // });
        if (i===n-1) {
          setMessages(msgsSnap);
        }
      })
    });
    return function(){
      setMessages([]);
      cleanUp();
    }
  }, [chatId]);

  useEffect(()=>{
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((msg,i)=>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        if(msg.sentBy===currentUser?.uid){
          return <div key={i} className="userMsg">{msg.messageText}</div>
        } else{
          return <ChatMessage key={i} msg={msg} />
        }
      })}
      <div ref={bottomRef} />
    </div>
  )
}
