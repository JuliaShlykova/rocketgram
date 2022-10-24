import favicon from '../../assets/favicon.svg';
import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';

export default function ChatMessage({msg}) {
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(()=>{
    database.getUserInfo(msg.sentBy).then(userInfo=>{
      setUser(userInfo);
    });
  }, [msg]);

  useEffect(()=>{
    if(user){
      setPhotoURL(user.photoURL);
    }
  }, [user])

  return (
    <div className='block-message'>
    <div className='user-avatar'>
      {(user&&photoURL)
      ?(<img src={photoURL} onError={()=>{setPhotoURL(favicon)}} alt={user.displayName} referrerPolicy="no-referrer"></img>)
      :(<span>{user?.displayName[0].toUpperCase()}</span>)
      }
    </div>
    <div className="compMsg">
    <p>{user?.displayName}</p>
      {msg.messageText}
    </div>
    </div>
  )
}
