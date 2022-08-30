import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import Pikachu from './pikachu.jpg';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
  }
}));

const Error404: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <React.Fragment>
      <img src={Pikachu} alt="404 error" className={classes.image} />
      <p>Opps! It seems the page you're looking for doesn't exist</p>
      <Button variant="outlined" color="primary" onClick={history.goBack}>
        Go back
      </Button>
    </React.Fragment>
  );
};

export default Error404;
