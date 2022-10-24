import { collection, deleteDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../contexts/AuthContext";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

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

const Chat = ({ chatId }) => {
  const { currentUser, displayName } = useAuth();

  // useEffect(()=>{
  //   deleteMessages();
  // }, []);

  if(currentUser){
    return (
    <div className="chat">
    <ChatBody chatId={chatId}/>
    <ChatInput chatId={chatId} currentUser={currentUser} displayName={displayName} />
  </div>
  )} else{
    return (
      <div className="chat"></div>
    )
  }
}

export default Chat;