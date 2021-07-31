import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Input} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '50px',
    backgroundColor: '#fafafa',
    position: 'absolute',
    bottom: '10px'
  },
  input: {
    padding: '3px 10px'
  },
  button: {
    width: '60px'
  },
  picker: {
    position: 'absolute',
    left: '20px'
  }
});



function MessageForm({username, socket}) {
  const [value, setValue] = useState('')
  const classes = useStyles();

  const sendMessage = async (e) => {
    e.preventDefault();
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
    <form onSubmit={sendMessage} className={classes.root}>
      <Input
        placeholder='Type your message'
        value={value}
        onChange={event => setValue(event.target.value)}
        type="text"
        fullWidth
        color="secondary"
        className={classes.input}/>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        type="submit"
      >Send</Button>
    </form>
  );
}

export default MessageForm;