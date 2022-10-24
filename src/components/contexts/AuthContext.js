import React, { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, database } from '../../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [currentUser, setUser] = useState();
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user=>{
      setUser(user);
      if (user) {
        (async function(){
          let existing = await database.checkIfUserInFirestore(user.uid);
          if(!(user?.displayName)&&existing){
            let userFromFirestore = await database.getUserInfo(user.uid);
            let displayName = userFromFirestore.displayName;
            setDisplayName(displayName);
          }
        })()
      }
    });
    return unsubscribe;
  },[]);

  const signin = async (google=true, email='', password='') => {
    let cred;
    if(google){
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      cred = await signInWithPopup(auth, provider);
      setDisplayName(cred.user.displayName);
      database.saveUserToFirestore(cred.user);
    } else{
      cred = await signInWithEmailAndPassword(auth, email, password);
      let userFromFirestore = await database.getUserInfo(cred.user.uid);
      let displayName = userFromFirestore.displayName;
      setDisplayName(displayName);
      database.saveUserToFirestore(cred.user, displayName);
    }
  }

  const signup = async ({email, password, displayName}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await database.saveUserToFirestore(cred.user, displayName);
    setDisplayName(displayName);
  }

  const logout = () => {
    setDisplayName('');
    return signOut(auth);
  }

  const resetPassword = async (email) => {
    sendPasswordResetEmail(auth, email);
  }

  let value={
    currentUser,
    signin,
    logout,
    signup,
    displayName,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {/* {!loading&&children} */}
      {children}
    </AuthContext.Provider>
  )
}
