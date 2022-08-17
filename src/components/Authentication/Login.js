import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login({setState}) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin } = useAuth();

  const handleSubmit = (e) => {
    setError('');
    e.preventDefault();
    try {
      signin({google:false, email, password});
    } catch(e) {
      console.log('caught an error!', e);
      setError('Failed to log in');
    }
  }

  return (
  <>
    {error&&<div>Error</div>}
    <form className="form-log-in" onSubmit={handleSubmit}>
      <label>Email
        <input type="email" value={email} onChange={e=>{setEmail(e.target.value)}} required />
      </label>
      <label>Password
      <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}} required />
      </label>
      <button type="submit">Log In</button>
      <div id="link-to-forgot-password">Forgot password?</div>
    </form>
    <div>Need an account? <span id="link-to-signup" onClick={()=>{setState('signup')}}>Sign Up</span></div>
    
  </>
  )
}
