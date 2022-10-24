import { getDownloadURL, ref } from 'firebase/storage';
import { FaSun } from 'react-icons/fa';
import { GiWaveSurfer } from 'react-icons/gi';
import { IoMdCloudy } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import { storage, database } from '../../firebase';

export default function ChatHead({name, members}) {
  const [theme, setTheme] = useState('light');
  const [chatMembers, setChatMembers] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(()=>{
    if(members.length>0){
      let newMembers = [];
      members.forEach(memberId => {
        (async function(){
          let info = await database.getUserInfo(memberId);
          newMembers.push(info.displayName);
          if(newMembers.length===members.length){
            setChatMembers(newMembers)
          }
        })()
      });
      ;
    } else{
      setChatMembers([]);
    }
  }, [members])

  useEffect(() => {
    switch (theme) {
      case 'dark':
        darkTheme();
        break;
      case 'bright':
        brightTheme();
        break;
      default:
        lightTheme();
        break;
    }
  }, [theme])
  

  function darkTheme () {
    let root = document.documentElement;
    root.style.setProperty('--basic-color', 'rgb(35, 35, 36)');
    root.style.setProperty('--other-msg', 'rgb(180,180,180)');
    root.style.setProperty('--focused-chat', 'rgb(167,167,167)');
    root.style.setProperty('--hover-chat', 'rgb(209,208,207)');
    getDownloadURL(ref(storage, 'gray-texture.png'))
      .then((url) => {
        root.style.setProperty('--bcgr-image', 'url('+url+')');
      })
      .catch((e) => {
        console.error('Failed to load image-theme');
      });
    root.style.setProperty('--text-color-other-msg', 'black');
    root.style.setProperty('--text-color-basic', 'white');
  };
  
  function brightTheme () {
    let root = document.documentElement;
    root.style.setProperty('--basic-color', 'rgb(121,185,212)');
    root.style.setProperty('--other-msg', 'rgb(9,74,113)');
    root.style.setProperty('--focused-chat', 'rgb(0,115,153)');
    root.style.setProperty('--hover-chat', 'rgb(114,177,203)');
    getDownloadURL(ref(storage, 'underwater.jpg'))
    .then((url) => {
      console.log(url);
      root.style.setProperty('--bcgr-image', 'url('+url+')');
    })
    .catch((e) => {
      console.error('Failed to load image-theme');
    });
    root.style.setProperty('--text-color-other-msg', 'white');
    root.style.setProperty('--text-color-basic', 'black');
  }
  
  function lightTheme () {
    let root = document.documentElement;
    root.style.removeProperty('--bcgr-image');
    root.style.setProperty('--basic-color', '#e6c1a6');
    root.style.setProperty('--other-msg', '#854e24');
    root.style.setProperty('--focused-chat', '#583418');
    root.style.setProperty('--hover-chat', '#daa379');
    root.style.setProperty('--text-color-other-msg', 'white');
    root.style.setProperty('--text-color-basic', 'black');
  }

  return (
    <div className="chat-head">
    <span onMouseOver={()=>{setShowInfo(true)}} onMouseOut={()=>{setShowInfo(false)}}>{name}</span>
    {(chatMembers.length>0&&showInfo)?(<div className='members'>
      <span>{chatMembers.length} members: </span>
      <ul>
        {chatMembers.map((member,i)=>(
          <li key={i}>{member}</li>
        ))}
      </ul>
    </div>):null}
    <div className='themes'>
      {(theme!=='light')&&<div className='theme' style={{color: 'white'}} onClick={()=>{setTheme('light');}}><FaSun /></div>}
      {(theme!=='bright')&&<div className='theme' style={{color:'cadetblue'}} onClick={()=>{setTheme('bright');}}><GiWaveSurfer /></div>}
      {(theme!=='dark')&&<div className='theme' style={{color:'black'}} onClick={()=>{setTheme('dark');}}><IoMdCloudy /></div>}
    </div>
    </div>
    
  )
}
