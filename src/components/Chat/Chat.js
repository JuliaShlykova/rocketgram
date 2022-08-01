import { collection, deleteDoc, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase";
import ChatBody from "./ChatBody";
import ChatHead from "./ChatHead";
import ChatInput from "./ChatInput";


let uniqueValue = (function(){
  let count = 0;
  return function(){
    return count++;
  }
})()

const deleteMessages = (chatId='chat1') => {
  const msgSubCol = collection(db, 'chats', chatId, 'messages');
  const msgQuery = query(msgSubCol);
  (async function() {
    const querySnapShot = await getDocs(msgQuery);
    querySnapShot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    })
  })();
}

const Chat = ({name, chatId = 0}) => {

  // useEffect(()=>{
  //   deleteMessages();
  // }, []);


  return (
    <div className="chat">
      <ChatHead name={name} />
      <ChatBody />
      <ChatInput />
    </div>
  )
}

export default Chat;