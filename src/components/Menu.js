import favicon from '../assets/favicon.svg';
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import AddNewChat from './AddNewChat';
import AuthenticationModal from './Authentication/AuthenticationModal';
import AddNewGroup from './AddNewGroup';

const preventClosing = (e) => {
  e.stopPropagation();
}

const Menu = ({setUserWindow, setChatId}) => {
  const [userPhoto, setUserPhoto] = useState(favicon);
  const { currentUser, logout, displayName } = useAuth();

  useEffect(() => {
    if(currentUser?.photoURL) {
      setUserPhoto(currentUser.photoURL);
    }
  }, [currentUser]);

  const rmUserWindow = (e) => {
    setUserWindow(false);
  }

  const handleLogout = () => {
    setUserPhoto(favicon);
    setChatId('main');
    logout();
  }

  return (
    <div className="user-container" onClick={currentUser?rmUserWindow:undefined}>
      <div id="user-picture">
        <img src={userPhoto} alt="user" onError={()=>{setUserPhoto(favicon)}} onClick={preventClosing} referrerPolicy="no-referrer"></img>
      </div>
      {currentUser
      ?(<ul className="user-menu" onClick={preventClosing}> 
      <span>{displayName}</span>     
        <li>
          <button id="log-out" onClick={handleLogout}>
            <MdLogout /> Log Out
          </button>
        </li>
        <li><AddNewChat setUserWindow={setUserWindow} setChatId={setChatId}/></li>
        <li><AddNewGroup setUserWindow={setUserWindow} setChatId={setChatId}/></li>
      </ul>)
      :<AuthenticationModal />}
    </div>
  )
}

export default Menu;