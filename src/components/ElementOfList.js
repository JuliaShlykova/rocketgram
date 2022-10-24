import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database, db } from "../firebase";
import { useAuth } from "./contexts/AuthContext";

function defineLastMsg(el, currentUser){
  if (el.lastMsg.userId===currentUser.uid){
    return el.lastMsg.text;
  } else {
    return el.lastMsg.userName+': '+el.lastMsg.text;
  }
};

const ElementOfList = ({ 
    el='testId',
    setChatName=()=>{},
    focused=false,
    setChatId=()=>{},
    setMembers=()=>{}
  }) => {
  const [corName, setCorName] = useState('name');
  const [lastMsg, setLastMsg] = useState('chat is created');
  const [chatMembers, setChatMembers] = useState([]);
  const { currentUser } = useAuth();

  useEffect(()=>{
    const unsubscribe=onSnapshot(doc(db,'groups',el), doc=>{
      const chatInfo = doc.data();
      if(chatInfo?.plural&&chatInfo?.members){
        setChatMembers(chatInfo.members);
      }
      if(chatInfo?.name){
        setCorName(chatInfo.name);
      } else{
        let otherUserId = chatInfo.members.filter(el=>el!==currentUser.uid)[0];
        (async function(){
          let otherUser = await database.getUserInfo(otherUserId);
          if (otherUser) {
            let otherName = otherUser.displayName;
            setCorName(otherName);
          }
        })()
      };
      if(chatInfo?.lastMsg){
        let msg=defineLastMsg(chatInfo, currentUser);
        setLastMsg(msg);
      }
      
    });
    return unsubscribe;
  },[el, currentUser]);

  useEffect(()=>{
    if(focused){
      setChatName(corName);
      setMembers(chatMembers);
    }
  }, [focused, corName, setChatName, setMembers, chatMembers]);

  const changeFocused = (e) => {
    setChatId(el);
  }

  return (
    <div onClick={changeFocused} className={`element-of-list ${focused?'element-of-list-focused':''}`}>
      <div className="element-of-list-icon">{corName[0].toUpperCase()}</div>
      <div>
        <p className="element-of-list-name">{corName}</p>
        <p className="element-of-list-msg">{lastMsg}</p>
      </div>
    </div>
  )
}

export default ElementOfList;