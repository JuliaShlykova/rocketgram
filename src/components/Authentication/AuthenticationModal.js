import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../contexts/AuthContext';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import SignUp from './SignUp';

const preventClosing = (e) => {
  e.stopPropagation();
}

export default function AuthenticationModal() {
  const [state, setState] = useState('login');
  const [curComponent, setCurComponent] = useState(<Login setState={setState}/>);
  const { signin } = useAuth();
  const [error, setError] = useState('');

  useEffect(()=>{
     switch(state) {
      case 'login':
        setCurComponent(<Login setState={setState} setError={setError} />);
        break;
      case 'signup':
        setCurComponent(<SignUp setState={setState} setError={setError} />);
        break;
      case 'forgot-password':
        setCurComponent(<ForgotPassword setState={setState} setError={setError} />);
        break;
      default:
        console.error('incorrect state');
     }
  },[state])

  const handleSignin = async () => {
    setError('');
    try {
      await signin();
    } catch(e) {
      setError('Failed to log in');
    }
  }

  return (
    <div className='log-in-container' onClick={preventClosing}>
      {error&&(<div className='error'>{error}</div>)}
      {curComponent}
      <button id="log-in" onClick={handleSignin}><FcGoogle />  Sign in with Google</button>
    </div>)
}
