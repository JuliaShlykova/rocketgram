import { useAuth } from "../contexts/AuthContext";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

const Chat = ({ chatId }) => {
  const { currentUser, displayName } = useAuth();

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