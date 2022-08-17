import React, { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const signin = async (google=true, email='', password='') => {
  if(google){
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    await signInWithPopup(auth, provider);
  } else{

  }

}

const signup = async ({email, password}) => {
  await createUserWithEmailAndPassword(auth, email, password);
}

const logout = () => {
  return signOut(auth);
}

export function AuthProvider({children}) {
  const [currentUser, setUser] = useState();



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user=>{
      console.log('current user: ', user);
      setUser(user);
    });
    return unsubscribe;
  },[])

  let value={
    currentUser,
    signin,
    logout,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
