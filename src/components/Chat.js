import React, {useEffect, useRef, useState} from 'react';
import Header from "./Header";
import {Container} from "@material-ui/core";
import '../App.css'
import MessageList from "./MessageList";

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const username = sessionStorage.getItem('nickname')
  const socket = useRef()

  function connect() {
    socket.current = new WebSocket('ws://localhost:4000')

    socket.current.onopen = () => {
      const message = {
        event: 'connection',
        username,
        id: Date.now()
      }
      socket.current.send(JSON.stringify(message))
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
    }

    socket.current.onclose = () => {
      console.log('Socket close')
    }

    socket.current.onerror = () => {
      console.log('Socket error')
    }
  }

  useEffect(() => {
    connect()
  }, []);



  const sendMessage = async () => {
    const message = {
      message: value,
      event: 'message',
      username,
      id: Date.now()
    }
    socket.current.send(JSON.stringify(message))
    setValue('')
  }

  return (
    <Container maxWidth={'xs'} className={'chat'} >
      <Header username={username}/>
      <MessageList messages={messages} nickname={username} />
      <div>
        <input value={value} onChange={event => setValue(event.target.value)}/>
        <button onClick={sendMessage}>Send</button>
      </div>
    </Container>
  );
}

export default Chat;