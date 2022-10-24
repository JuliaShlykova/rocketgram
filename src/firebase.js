// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
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
  groupMessages(groupId) {return collection(db, 'messages', groupId, 'messages')},
  getUserInfo: async function(userId) {
    try{
      const userSnap = await getDoc(this.userRef(userId));
      return userSnap.data();
    } catch {
      console.error('failed to get user: ', userId);
    }
  },
  checkIfUserInFirestore: async function(userId) {
    const userRef = this.userRef(userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  },
  saveUserToFirestore: async function(user, displayName='') {
    const userRef = this.userRef(user.uid);
    const userSnap = await getDoc(userRef);
    try{
      if (userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: displayName||user.displayName,
          photoURL: user.photoURL,
          email: user.email
        }, 
        {
          merge: true
        });
      } else {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: displayName||user.displayName,
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
  createGroup: async function({ userId, plural, groupName='', chosenUserId=null, chosenUserIds=null }) {
    if (plural) {
      try{
        let group = await addDoc(this.groups, {
          createdBy: userId,
          plural,
          name: groupName,
          createdAt: serverTimestamp(),
          members: [userId, ...chosenUserIds]
        });
        await this.saveGroupIdToUser(group.id, userId);
        for (let user of chosenUserIds) {
          this.saveGroupIdToUser(group.id, user);
        }
        updateDoc(group, {id: group.id});
        return group.id;
      }catch(e){
        console.error('Failed to add group: ',e);
      }
    } else {
      this.savechosenUserIdToContacts(userId, chosenUserId);
      this.savechosenUserIdToContacts(chosenUserId, userId);
      try{
        let group = await addDoc(this.groups, {
          createdBy: userId,
          plural,
          createdAt: serverTimestamp(),
          members: [userId, chosenUserId]
        });
        this.saveGroupIdToUser(group.id, userId);
        this.saveGroupIdToUser(group.id, chosenUserId);
        updateDoc(group, {id: group.id});
        return group.id;
      }catch(e){
        console.error('Failed to add group: ',e);
      }
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
  getAllUsersExceptCurrent: async function(currentUser) {
    try {
      const q = query(this.users, where('uid', '!=', currentUser.uid));
      const allUsers = await getDocs(q);
      let arrUsers = [];
      allUsers.forEach(user=>arrUsers.push(user.data()));
      return arrUsers;
    } catch(error) {
      console.error('Failed to get users');
    }

  },
  getRegisteredUsers: async function(currentUser) {
    try{
      const allUsers = await getDocs(this.users);
      const user = await getDoc(this.userRef(currentUser.uid));
      const alreadyExistedContacts = user.data().contacts;
      let otherUsers = [];
      allUsers.forEach(user=>otherUsers.push(user.data()));
      otherUsers = otherUsers.filter(user=>(user.uid!==currentUser.uid)&&(!alreadyExistedContacts.includes(user.uid)));
      return otherUsers;
    } catch(error) {
      console.error('Failed to get users');
    }
  },
  getListOfGroups: async function(groupsIds) {
    let groupsWithUser = [];
    for (let groupId of groupsIds) {
      let group = await getDoc(doc(db, 'groups',groupId));
      groupsWithUser.push(group.data());
    }
    return groupsWithUser;
  },
  updateGroupLastMsg: async function(chatId, msgText, currentUser, displayName) {
    try {
      const conMsg = (msgText.length>30)?(msgText.slice(0,28)+'...'):msgText;
      await updateDoc(doc(db, 'groups', chatId), {
        lastMsg: {
          text: conMsg,
          userId: currentUser.uid,
          userName: displayName
        }
      });
    } catch {
      console.error('Failed to save the last message');
    }
  },
  saveMsgToGroup: async function(chatId, msgText, currentUser, displayName) {
    try {
      await addDoc(this.groupMessages(chatId), {
        messageText: msgText,
        sentBy: currentUser.uid,
        sentAt: serverTimestamp()
      });
      await this.updateGroupLastMsg(chatId, msgText, currentUser, displayName);
    } catch (e) {
      console.log('Error when writing new message to Firebase Database', e);
    }
  }
} 

export default app;
export { storage, auth, database, db };