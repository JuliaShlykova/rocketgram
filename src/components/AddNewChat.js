import React, { useEffect, useState } from 'react';
import { GiOctoman } from "react-icons/gi";
import { database } from '../firebase';
import { useAuth } from './contexts/AuthContext';

export default function AddNewChat({setUserWindow}) {
  const [open, setOpen] = useState(false);
  const [otherUsers, setOtherUsers] = useState(null);
  const [chosenUser, setChosenUser] = useState(null);
  const {currentUser} = useAuth();

  useEffect(() => {
    (async function(){
      const users = await database.getRegisteredUsers(currentUser);
      setOtherUsers(users);
    })()
  },[setOtherUsers, currentUser]);
  
  

  const openDialogue = () => {
    setOpen(true);
  }

  const closeDialogue = () => {
    setOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setUserWindow(false);
    database.createGroup({userId: currentUser.uid, plural: false, chosenUserId:chosenUser});
  }

  return (
    <>
    <button onClick={openDialogue}><GiOctoman /> Add New Chat</button>
    {open&&(<div className="add-chat-container" onClick={closeDialogue}>
      <form onSubmit={handleSubmit} onClick={(e)=>{e.stopPropagation()}} class="form-add-user">
        <label htmlFor='user-select'>Choose a person</label>
        <select id="user-select" onChange={(e)=>{let i=e.target.selectedIndex;setChosenUser(e.target.options[i].value)}} required>
        <option value=""></option>
        {otherUsers.map((user,i) => {
          return(
            <option key={i} value={user.uid}>
            {user.displayName}
            </option>
          )
        })}
        </select>
        <button type="submit">Add New Chat</button>
      </form>
    </div>)}
    </>
  )
}
