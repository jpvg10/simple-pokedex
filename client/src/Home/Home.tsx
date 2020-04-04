import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import pokeball from './pokeball.png';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
  }
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h3">Welcome to the Simple Pokédex</Typography>
      <img src={pokeball} alt="Pokéball" className={classes.image} />
    </React.Fragment>
  );
};

export default Home;
