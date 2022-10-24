import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp({setState, setError}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordsEqual, setPasswordsEqual] = useState(true);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();
    if(!passwordsEqual) {
      return setError('passwords don\'t match');
    }
    try {
      setLoading(true);
      await signup({email, password, displayName});
    } catch(e) {
      setError('Failed to sign up');
    } finally{
      setLoading(false);
    }
  }

  return (
  <>
    <form className="form-log-in" onSubmit={handleSubmit}>
      <label>Nickname
        <input type="text" value={displayName} onChange={e=>{setDisplayName(e.target.value)}} required />
      </label>
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
      <button type="submit" disabled={loading}>Sign Up</button>
    </form>
    <div>Already have an account? <span id="link-to-login" onClick={()=>{setState('login')}}>Log In</span></div>
  </>
  )
}
