import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login({setState, setError}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin } = useAuth();

  const handleSubmit = async(e) => {
    setError('');
    e.preventDefault();
    try {
      setLoading(true);
      await signin(false, email, password);
    } catch(e) {
      setError('Failed to log in')
    } finally{
      setLoading(false);
    }
  }

  return (
  <>
    <form className="form-log-in" onSubmit={handleSubmit}>
      <label>Email
        <input type="email" value={email} onChange={e=>{setEmail(e.target.value)}} required />
      </label>
      <label>Password
      <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}} required />
      </label>
      <button type="submit" disabled={loading}>Log In</button>
      <div id="link-to-forgot-password" onClick={()=>{setState('forgot-password')}}>Forgot password?</div>
    </form>
    <div>Need an account? <span id="link-to-signup" onClick={()=>{setState('signup')}}>Sign Up</span></div>
    
  </>
  )
}
