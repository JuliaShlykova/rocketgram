import { useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import ChatHead from './components/Chat/ChatHead';
import { AuthProvider } from './components/contexts/AuthContext';
import ListOfChats from './components/ListOfChats';
import Menu from './components/Menu';
import IfUser from './IfUser';

function App() {
  const [chatId, setChatId] = useState('main');
  const [userWindow, setUserWindow] = useState(true);
  const [chatName, setChatName] = useState('main');
  const [members, setMembers] = useState([]);

  return (
    <AuthProvider>
    <div className="App">
      {userWindow?<Menu setUserWindow={setUserWindow} setChatId={setChatId} />:null}
      <IfUser members={members} setMembers={setMembers} chatId={chatId} chatName={chatName} setChatId={setChatId} setChatName={setChatName} setUserWindow={setUserWindow} />
    </div>
    </AuthProvider>
  );
}

export default App;
