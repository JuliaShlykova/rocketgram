import { useState } from 'react';
import './App.css';
import { AuthProvider } from './components/contexts/AuthContext';
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
      <IfUser 
      members={members} 
      setMembers={setMembers} 
      chatId={chatId} 
      chatName={chatName} 
      setChatId={setChatId} 
      setChatName={setChatName} 
      setUserWindow={setUserWindow} 
      />
    </div>
    </AuthProvider>
  );
}

export default App;