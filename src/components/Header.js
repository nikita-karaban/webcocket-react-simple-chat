import React from 'react';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Header(props) {

  const handleSignOut = () => {
    sessionStorage.removeItem('nickname')
  }

  return (

    <Grid
      container
      justify='space-between'
      color='secondary'
    >
      <Typography
        variant="h5"
      >Hello, {props.username}</Typography>
      <Link
        to='/'
        onClick={handleSignOut}
      >X</Link>
    </Grid>
  );
}

export default Header;