import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import ListOfChats from './components/ListOfChats';
import User from './components/User';

function App() {
  let [chatId, setChatId] = useState(0);
  let [userWindow, setUserWindow] = useState(true);
  let list=[{name:'test'},{name:'test2'},{name:'iamtest3'}]

  return (
    <div className="App">
      {userWindow?<User setUserWindow={setUserWindow} />:null}
      <ListOfChats focused={chatId} setChatId={setChatId} list={list} setUserWindow={setUserWindow} />
      <Chat chatId={chatId} name={list[chatId].name}/>
    </div>
  );
}

export default App;
