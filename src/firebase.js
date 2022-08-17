// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web apps Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const database = {
  users: collection(db, 'users'),
  groups: collection(db, 'groups'),
  userRef(userId) { return doc(db, 'users', userId) },
  saveUserToFirestore: async function(user) {
    const userRef = this.userRef(user.uid);
    const userSnap = await getDoc(userRef);
    try{
      if (userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email
        }, 
        {
          merge: true
        });
      } else {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          groups: ['main'],
          contacts: []
        })
      }
    } catch {
      console.error('Failed to add user to Firestore');
    }

  },
  createGroup: async function({ userId, plural, chosenUserId=null, chosenUserIds=null }) {
    if (plural) {

    } else {
      this.savechosenUserIdToContacts(userId, chosenUserId);
      this.savechosenUserIdToContacts(chosenUserId, userId);
      addDoc(this.groups, {
        createdBy: userId,
        plural,
        createdAt: serverTimestamp(),
        members: [userId, chosenUserId]
      }).then(doc=>{
        this.saveGroupIdToUser(doc.id, userId);
        this.saveGroupIdToUser(doc.id, chosenUserId);
      }).catch(e=>{
        console.error('Failed to add group');
      })
    }
  },
  savechosenUserIdToContacts: async function(userId, chosenUserId) {
    try {
      await updateDoc(this.userRef(userId), {
        contacts: arrayUnion(chosenUserId)
      });
    } catch {
      console.error('Failed to update contacts field');
    }
  },
  saveGroupIdToUser: async function(groupId, userId) {
    try {
      await updateDoc(this.userRef(userId), {
        groups: arrayUnion(groupId)
      });
    } catch {
      console.error('Failed to update groups field');
    }
  },
  getRegisteredUsers: async function(currentUser) {
    try{
      const allUsers = await getDocs(this.users);
      const user = await getDoc(this.userRef(currentUser.uid));
      const alreadyExistedContacts = user.data().contacts;
      console.log(alreadyExistedContacts);
      let otherUsers = [];
      allUsers.forEach(user=>otherUsers.push(user.data()));
      otherUsers = otherUsers.filter(user=>(user.uid!==currentUser.uid)&&(!alreadyExistedContacts.includes(user.uid)));
      return otherUsers;
    } catch(error) {
      console.error('Failed to get users');
    }
  }
} 

export default app;
export { storage, auth, database, db };