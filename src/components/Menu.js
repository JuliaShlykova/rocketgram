import favicon from '../assets/favicon.svg';
import { MdLogin, MdLogout } from "react-icons/md";

import { BsFillPeopleFill} from "react-icons/bs";
import { useEffect, useState } from 'react';
import { database } from '../firebase';
import { useAuth } from './contexts/AuthContext';
import AddNewChat from './AddNewChat';
import Login from './Authentication/Login';
import AuthenticationModal from './Authentication/AuthenticationModal';

const preventClosing = (e) => {
  e.stopPropagation();
}

console.log('menu.js is running');

const Menu = ({setUserWindow}) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const { currentUser, logout } = useAuth();
  
  useEffect(() => {
    if(currentUser) {
      database.saveUserToFirestore(currentUser);
      setUserPhoto(currentUser?.photoURL);
    }
  }, [currentUser]);

  const rmUserWindow = (e) => {
    setUserWindow(false);
  }

  const handleLogout = () => {
    setUserPhoto(null);
    logout();
  }

  return (
    <div className="user-container" onClick={currentUser?rmUserWindow:undefined}>
      <div id="user-picture">
        <img src={userPhoto||favicon} alt="user" onClick={preventClosing} referrerPolicy="no-referrer"></img>
      </div>
      {currentUser
      ?(<ul className="user-menu" onClick={preventClosing}> 
      {currentUser.displayName}     
        <li>
          <button id="log-out" onClick={handleLogout}>
            <MdLogout /> Log Out
          </button>
        </li>
        <li><AddNewChat setUserWindow={setUserWindow} /></li>
        <li><button><BsFillPeopleFill /> Create Group</button></li>

      </ul>)
      :<AuthenticationModal />}
    </div>
  )
}

export default Menu;