import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp({setState}) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordsEqual, setPasswordsEqual] = useState(true);
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!passwordsEqual) {return}
    try {
      signup({email, password});
    } catch(e) {
      console.log('caught an error!', e);
      setError('Failed to sign up');
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
      <label>Password Confirmation
      <input type="password" value={passwordConfirm} onChange={e=>{setPasswordConfirm(e.target.value); setPasswordsEqual(e.target.value===password)}} required />
      </label>
      {!passwordsEqual&&<div id="error-passwords-not-equal">*passwords don't match up</div>}
      <button type="submit">Sign Up</button>
    </form>
    <div>Already have an account? <span id="link-to-login" onClick={()=>{setState('login')}}>Log In</span></div>
    
  </>
  )
}
