import ChatBody from "./ChatBody";
import ChatHead from "./ChatHead";
import ChatInput from "./ChatInput";

let uniqueValue = (function(){
  let count = 0;
  return function(){
    return count++;
  }
})()

const Chat = ({name, chatId = 0}) => {



  return (
    <div className="chat">
      <ChatHead name={name} />
      <ChatBody />
      <ChatInput />
    </div>
  )
}

export default Chat;