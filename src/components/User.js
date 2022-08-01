import favicon from '../assets/favicon.svg';
import { MdLogin, MdLogout } from "react-icons/md";
import { GiOctoman } from "react-icons/gi";
import { BsFillPeopleFill} from "react-icons/bs";
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

const preventClosing = (e) => {
  e.stopPropagation();
}

//authentication with Google
const signIn = async () => {
  const provider = new GoogleAuthProvider();
  console.log('signing in');
  await signInWithPopup(auth, provider);
}

const saveUserToFirestore = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email
  });  
}

console.log('user.js is running');

const User = ({setUserWindow}) => {
  const [signedIn, setSignedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        console.log('user is signed in!');
        // user.uid - temprorary id
        console.log(`id: ${user.uid}
          display name: ${user.displayName}
          email: ${user.email}
          photoURL: ${user.photoURL}
        `);
        saveUserToFirestore(user);
        setUserPhoto(user.photoURL);
        setSignedIn(true);
      } else {
        console.log('user is not signed in');
        setUserPhoto(null);
        setSignedIn(false);
      }
    });
    console.log('unsubscribe: ',unsubscribe);
    return unsubscribe;
  }, [setSignedIn]);

  const rmUserWindow = (e) => {
    setUserWindow(false);
  }

  const changeSignedIn = () => {
    if(signedIn) {
      signOut(auth).then(() => {
        console.log('you have signed out!');
      })
      // setSignedIn(false);
    } else {
      signIn();
      // setSignedIn(true);
    }
  }

  return (
    <div className="user-container" onClick={signedIn?rmUserWindow:undefined}>
      <div id="user-picture">
        <img src={userPhoto||favicon} alt="user" onClick={preventClosing}></img>
      </div>
      {signedIn
      ?(<ul className="user-menu" onClick={preventClosing}>      
        <li>
          <button id="log-out" onClick={changeSignedIn}>
            <MdLogout /> Log Out
          </button>
        </li>
        <li><button><GiOctoman /> Add new Chat</button></li>
        <li><button><BsFillPeopleFill /> Create Group</button></li>

      </ul>)
      :(<div className='user-menu' onClick={preventClosing}>
        <button id="log-in" onClick={changeSignedIn}><MdLogin />  Sign in with Google</button>
      </div>)}
    </div>
  )
}

export default User;