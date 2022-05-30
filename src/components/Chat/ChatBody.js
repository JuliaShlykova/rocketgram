import React from 'react'

export default function ChatBody() {
  let userMsg = 'Hi there! How are you?';
  let compMsg = 'Hi! I am fine, what\'s up?';

  return (
      <div className="messages">
        <div className="userMsg">{userMsg}</div>
        <div className="compMsg">{compMsg}</div>
      </div>
  )
}
