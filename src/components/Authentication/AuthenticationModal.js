import React, { useEffect, useState } from 'react'
import { MdLogin } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import SignUp from './SignUp';

const preventClosing = (e) => {
  e.stopPropagation();
}

export default function AuthenticationModal() {
  const [state, setState] = useState('login');
  const [curComponent, setCurComponent] = useState(<Login setState={setState}/>);
  const { currentUser,  signin, logout } = useAuth();
  const [error, setError] = useState('');


  useEffect(()=>{
     switch(state) {
      case 'login':
        setCurComponent(<Login setState={setState} />);
        break;
      case 'signup':
        setCurComponent(<SignUp setState={setState} />);
        break;
      default:
        console.error('incorrect state');
     }

  },[state])

  const handleSignin = () => {
    try {
      signin();
    } catch(e) {
      console.log('caught an error!', e);
      setError('Failed to log in');
    }
  }

  return (
    <div className='log-in-container' onClick={preventClosing}>
      {curComponent}
      <button id="log-in" onClick={handleSignin}><FcGoogle />  Sign in with Google</button>
    </div>)
  
}
