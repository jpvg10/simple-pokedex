import React from 'react';
import { Link } from 'react-router-dom';
import { IPokemonPicture } from '../utils/interfaces';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  name: {
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  link: {
    color: '#0000EE',
    '&:visited': {
      color: '#0000EE'
    }
  }
}));

const Pokemon: React.FC<IPokemonPicture> = ({ name, pictureUrl }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h6 className={classes.name}>{name}</h6>
      <img src={pictureUrl} alt="Pokémon" />
      <Link to={`/pokemon-details/${name}`} target="_blank" className={classes.link}>
        <p className={classes.name}>View details</p>
      </Link>
    </React.Fragment>
  );
};

export default Pokemon;
