import React from 'react';
import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import badges from './badges.png';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
    height: 'auto'
  }
}));

const RandomTeam: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h3">Get a random Pokémon Team</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          Select
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={badges} alt="Pokéball" className={classes.image} />
        </Grid>
      </Grid>
      <Typography variant="h5">Can you beat the Elite Four with this team?</Typography>
    </React.Fragment>
  );
};

export default RandomTeam;
