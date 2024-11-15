'use client';
import { useState } from "react";

export default function Home() {
  const [_chat, _setChat] = useState('');
  const [chat, setChat] = useState('');

  const onValueChanged = (text: string) => {
    _setChat(text);
  }
  const onSubmit = (e) => {
    setChat(_chat);
  }
  return (
    <div>
      <h2>Chat Room - User A</h2>
      <span>{chat}</span><br/><br/>
      <input style={{border: "1px solid black"}} value={_chat} onChange={e => onValueChanged(e.target.value)} />
      <span style={{background: 'red'}} onClick={onSubmit}>Chat now</span>
    </div>
  );
}
