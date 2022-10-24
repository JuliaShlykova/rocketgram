import ElementOfList from "./ElementOfList";
import { FaBars } from "react-icons/fa";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ListOfChats = ({
  focusedId=1,
  setChatId=()=>{},
  setChatName=()=>{}, 
  setUserWindow=()=>{},
  setMembers=()=>{}
}) => {
  const [groupIdsList, setGroupIdsList] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', currentUser.uid), doc=>{
      if (doc.data()) {      
        const groupIds = doc.data().groups;
        setGroupIdsList(groupIds);
      }
    });
    return unsubscribe;
  },[currentUser]);

  return (
    <div className="list-of-chats">
      <button id="menu" onClick={function(){setUserWindow(true)}}><FaBars /></button>
       {currentUser&&groupIdsList&&groupIdsList.map((el,i) =>
       <ElementOfList 
       el={el} 
       key={i} 
       focused={el===focusedId} 
       setChatId={setChatId}
       setChatName={setChatName} 
       setMembers={setMembers}
       />)}
    </div>
  )
}

export default ListOfChats;