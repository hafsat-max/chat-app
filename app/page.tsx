'use client';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";



export default function Home() {
  const [_chat, _setChat] = useState('');
  const [chat, setChat] = useState('');
  const [socket, setSocket] = useState(null);
  
  // console.log('ssss', server)

  const onValueChanged = (text: string) => {
    _setChat(text);
    
  }

  useEffect(() => {
    const server = io('http://localhost:3001');
    server.on("connect", () => {
      console.log('connected')
    })
    setTimeout(() => {
      if(server.connected) {
        console.log('sdflaksdfjdsfldsfjksadklfjdsf')
        server.on("send-message", () => console.log('i am listening'));
        server.emit("send-message", "dslfkjdfak")
        setSocket(server);
      }
    }, 500)
  }, [])

  // useEffect(() => {
  //   if(socket) {
  //     console.log('sjf')
  //     socket.on('connect', () => {
  //       console.log('Socket connected with ID:', socket.id); // Log when connected
  //     });
      
  //   }
  //   return () => {
  //     if(socket) {
  //       console.log('off')
  //       socket.off("send-message");
  //       socket.close();
  //     }
  //   };
  // }, [socket])


  const onSubmit = (e) => {
    if(socket) {
      socket.emit("send-message", _chat)
      setChat(_chat);
    }
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
