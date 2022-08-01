import React, { useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const signup = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  await signInWithPopup(auth, provider);//cred=>cred.user
}

const logout = () => {
  return signOut(auth);
}

export function AuthProvider({children}) {
  const [user, setUser] = useState();



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,user=>{
      setUser(user);
    });
    return unsubscribe;
  },[])

  let value={
    user,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
