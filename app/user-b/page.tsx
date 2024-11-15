'use client';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";



export default function Home() {
  const [_chat, _setChat] = useState('');
  const [chat, setChat] = useState('');
  const server = io();
  // console.log('ssss', server)

  const onValueChanged = (text: string) => {
    _setChat(text);
    
  }

  useEffect(() => {
    server.on("send-message", () => {
      console.log('message sent')
    });
    return () => {server.off("send-message")};

  }, [])


  const onSubmit = (e) => {
    server.emit("send-message", () => {
      console.log('emitted');
    })
    setChat(_chat);
  }


  return (
    <div>
      <h2>Chat Room - User b</h2>
      <span>{chat}</span><br/><br/>
      <input style={{border: "1px solid black"}} value={_chat} onChange={e => onValueChanged(e.target.value)} />
      <span style={{background: 'red'}} onClick={onSubmit}>Chat now</span>
    </div>
  );
}
