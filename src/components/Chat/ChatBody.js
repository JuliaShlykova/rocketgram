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
      setMessages([]);
      snapshot.docs.forEach(doc=>{
        setMessages(msgs=>{
          msgs.push(doc.data());
          return msgs;
        });
      })
    });
    return cleanUp;
  }, [chatId]);

  useEffect(()=>{
    if(messages.length>0) {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((msg,i)=>{
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
