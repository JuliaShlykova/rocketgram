import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword({setState, setError}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState();
  const { resetPassword } = useAuth();

  const handleSubmit = async(e) => {
    setError('');
    e.preventDefault();
    setMessage('');
    try {
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch(e) {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  }

  return (
  <>
    {message && <div className='msg-correct'>{message}</div> }
    <form className="form-log-in" onSubmit={handleSubmit}>
      <label>Email
        <input type="email" value={email} onChange={e=>{setEmail(e.target.value)}} required />
      </label>
      <button type="submit" disabled={loading}>Reset Password</button>
    </form>
    <div>Know your password? <span id="link-to-login" onClick={()=>{setState('login')}}>Login</span></div>
    <div>Need an account? <span id="link-to-signup" onClick={()=>{setState('signup')}}>Sign Up</span></div>
  </>
  )
}
