import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import ListOfChats from './components/ListOfChats';
import User from './components/User';
import { auth } from './firebase';

function App() {
  const [chatId, setChatId] = useState(0);
  const [userWindow, setUserWindow] = useState(true);
  let list=[{name:'test'},{name:'test2'},{name:'iamtest3'}];

  return (
    <div className="App">
      {userWindow?<User setUserWindow={setUserWindow} />:null}
      <ListOfChats focused={chatId} setChatId={setChatId} list={list} setUserWindow={setUserWindow} />
      <Chat chatId={chatId} name={list[chatId].name}/>
    </div>
  );
}

export default App;
