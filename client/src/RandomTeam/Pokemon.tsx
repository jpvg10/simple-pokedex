import React from 'react';
import { IPokemonPicture } from '../utils/interfaces';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  name: {
    textTransform: 'capitalize',
    textAlign: 'center'
  }
}));

const Pokemon: React.FC<IPokemonPicture> = ({ name, pictureUrl }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <img src={pictureUrl} alt="Pokémon" />
      <Typography paragraph className={classes.name}>
        {name}
      </Typography>
    </React.Fragment>
  );
};

export default Pokemon;
