import favicon from '../assets/favicon.svg';
import { MdLogin, MdLogout } from "react-icons/md";
import { GiOctoman } from "react-icons/gi";
import { BsFillPeopleFill} from "react-icons/bs";
import { useState } from 'react';

const preventClosing = (e) => {
  e.stopPropagation();
}

const User = ({setUserWindow}) => {
  let [signedIn, setSignedIn] = useState(true);


  const rmUserWindow = (e) => {
    setUserWindow(false);
  }

  const changeSignedIn = () => {
    if(signedIn) {
      setSignedIn(false);
    } else {
      setSignedIn(true);
    }
  }

  return (
    <div className="user-container" onClick={signedIn&&rmUserWindow}>
      <div id="user-picture">
        <img src={favicon} alt="user" onClick={preventClosing}></img>
      </div>
      {signedIn
      ?(<ul className="user-menu" onClick={preventClosing}>      
        <li>
          <button id="log-out" onClick={changeSignedIn}>
            <MdLogout /> Log Out
          </button>
        </li>
        <li><button><GiOctoman /> Add new Chat</button></li>
        <li><button><BsFillPeopleFill /> Create Group</button></li>

      </ul>)
      :(<div className='user-menu' onClick={preventClosing}>
        <button id="log-in" onClick={changeSignedIn}><MdLogin />  Sign in with Google</button>
      </div>)}
    </div>
  )
}

export default User;