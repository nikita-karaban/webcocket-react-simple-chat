import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {makeStyles} from '@material-ui/core/styles';
// import MessageItem from "./MessageItem";

function MessageList({messages, nickname}) {
  const useStyles = makeStyles({
    root: {
      overflow: 'auto',
      width: '100%',
      paddingBottom: '30px',
      paddingTop: '30px',
    },
    button: {
      backgroundColor: '#372549',
      opacity: '0.8',
      "&:hover": {
        backgroundColor: '#372549',
        opacity: '1'
      }
    }
  });

  console.log(messages)

  const classes = useStyles()

  return (
    <ScrollToBottom behavior='smooth' className={classes.root} followButtonClassName={classes.button}>
      {messages.map(mess =>
        <div key={mess.id}>
          {mess.event === 'connection'
            ? <div className="connection_message">
              Пользователь {mess.username} подключился
            </div>
            : <div className="message">
              {mess.username}: {mess.message}
            </div>
          }
        </div>
      )}
    </ScrollToBottom>
  );
}

export default MessageList;