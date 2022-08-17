import { useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import { AuthProvider } from './components/contexts/AuthContext';
import ListOfChats from './components/ListOfChats';
import Menu from './components/Menu';

function App() {
  const [chatId, setChatId] = useState(0);
  const [userWindow, setUserWindow] = useState(true);
  let list=[{name:'test'},{name:'test2'},{name:'iamtest3'}];

  return (
    <AuthProvider>
    <div className="App">
      {userWindow?<Menu setUserWindow={setUserWindow} />:null}
      <ListOfChats focused={chatId} setChatId={setChatId} list={list} setUserWindow={setUserWindow} />
      <Chat chatId={chatId} name={list[chatId].name}/>
    </div>
    </AuthProvider>
  );
}

export default App;
