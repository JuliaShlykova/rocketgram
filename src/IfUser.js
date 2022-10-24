import React, { useEffect } from 'react'
import Chat from './components/Chat/Chat';
import ChatHead from './components/Chat/ChatHead';
import { useAuth } from './components/contexts/AuthContext'
import ListOfChats from './components/ListOfChats';

export default function IfUser({members, setMembers, chatId, chatName, setChatId, setChatName, setUserWindow}) {
  const { currentUser } = useAuth();

  useEffect(()=>{
    setChatId('main');
  },[setChatId]);

  return (
    <>
    {currentUser?(<><ListOfChats setMembers={setMembers} focusedId={chatId} setChatId={setChatId} setChatName={setChatName} setUserWindow={setUserWindow} />
    <ChatHead name={chatName} members={members}/>
    <Chat chatId={chatId}  /></>):null}
    </>
  )
}
