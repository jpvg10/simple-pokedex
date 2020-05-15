import React from 'react';
import { Link } from 'react-router-dom';
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
      <Typography variant="h6" className={classes.name}>
        {name}
      </Typography>
      <img src={pictureUrl} alt="Pokémon" />
      <Link to={`/pokemon-details/${name}`} target="_blank">
        <p className={classes.name}>View details</p>
      </Link>
    </React.Fragment>
  );
};

export default Pokemon;
