import React from 'react';
import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import pokedex from './pokedex.png';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
    height: 'auto'
  }
}));

const Explore: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h3">Pokédex</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          List
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={pokedex} alt="Pokéball" className={classes.image} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Explore;
