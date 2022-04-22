import ElementOfList from "./ElementOfList";
import { FaBars } from "react-icons/fa";

const ListOfChats = ({list=[{name:'test'},{name:'test2'},{name:'iamtest3'}], focused=1, setChatId=()=>{}, setUserWindow=()=>{}}) => {

  return (
    <div className="list-of-chats">
      <button id="menu" onClick={function(){setUserWindow(true)}}><FaBars /></button>
      {list.map((el,i) => <ElementOfList el={el} key={i} index={i} focused={i===focused} setChatId={setChatId}/>)}
    </div>
  )
}

export default ListOfChats;