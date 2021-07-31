import React, {useEffect, useRef, useState} from 'react';
import Header from "./Header";
import {Container} from "@material-ui/core";
import '../App.css'
import MessageList from "./MessageList";
import {makeStyles} from "@material-ui/core/styles";
import MessageForm from "./MessageForm";

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const username = sessionStorage.getItem('nickname')
  const socket = useRef()

  const useStyles = makeStyles({
    root: {
      width: '30vw',
      minWidth: '300px',
      minHeight: '450px',
      height: '45vw',
      borderRadius: '10px',
      backgroundColor: '#fafafa',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  });

  const classes = useStyles()


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


  return (
    <Container maxWidth={'xs'} className={classes.root} >
      <Header username={username}/>
      <MessageList messages={messages} nickname={username} />
      <MessageForm username={username} socket={socket}/>
    </Container>
  );
}

export default Chat;