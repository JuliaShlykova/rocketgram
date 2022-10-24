import React, { useEffect, useState } from 'react';
import { BsFillPeopleFill} from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { database } from '../firebase';
import { useAuth } from './contexts/AuthContext';

export default function AddNewGroup({setUserWindow,setChatId}) {
  const [open, setOpen] = useState(false);
  const [otherUsers, setOtherUsers] = useState(null);
  const [chosenUsers, setChosenUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const {currentUser} = useAuth();

  useEffect(() => {
    (async function(){
      const users = await database.getAllUsersExceptCurrent(currentUser);
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
    (async function(){
      let chosenUserIds = chosenUsers.map(user=>user.id);
      let docId = await database.createGroup({userId: currentUser.uid, plural: true, groupName, chosenUserIds});
      setChatId(docId);
      setOpen(false);
      setUserWindow(false);
    })()
  }

  const removeElFromChosen = (e,i) => {
    e.stopPropagation();
    setChosenUsers(prevchosenUsers=>{
      if (i<prevchosenUsers.length-1) {
        return [...prevchosenUsers.slice(0,i),...prevchosenUsers.slice(i+1)];
      } else {
        return [...prevchosenUsers.slice(0,i)];
      }
    })
  }

  const handleSelection = (e)=>{
    let newUser = e.target.selectedOptions[0];
    let value = {name: newUser.label, id: newUser.value};
    let i = chosenUsers.findIndex(user=>{
      return user.id===value.id;
    })
    if (i===-1){
      setChosenUsers(prevchosenUsers=>[...prevchosenUsers, value]);
    } else {
      removeElFromChosen(e,i);
    }
  }

  return (
    <>
    <button onClick={openDialogue}><BsFillPeopleFill /> Create Group</button>
    {open&&(<div className="add-group-container" onClick={closeDialogue}>
      <form onSubmit={handleSubmit} 
        onClick={(e)=>{e.stopPropagation()}} 
        className="form-add-group"
      >
        <label>Group Name
          <input type="text" value={groupName} onChange={e=>{setGroupName(e.target.value)}} required />
        </label>
        <label htmlFor='user-select'>Choose people</label>
        <div className='chosen-users-conainer'>{
          chosenUsers.map((user, i)=>{
            return (
              <div key={i} className='chosen-user'>
              <span>{user.name}</span>
              <button type="button" onClick={(e)=>{removeElFromChosen(e,i)}}><ImCross /></button>
              </div>
            )
          })
        }</div>
        <select 
          id="user-select"
          multiple={true}
          size="4"
          value={chosenUsers.map(el=>el.id)}
          onChange={handleSelection}
          required
        >
        {otherUsers.map((user,i) => {
          return(
            <option key={i} value={user.uid}>
            {user.displayName}
            </option>
          )
        })}
        </select>
        <button type="submit">Add New Group</button>
      </form>
    </div>)}
    </>
  )
}
