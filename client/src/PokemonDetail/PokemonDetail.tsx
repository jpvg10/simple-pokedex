import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import StatProgressBar from './StatProgressBar';
import Defense from './Defense';
import TypeLabel from './TypeLabel';
import { getPokemonDetail } from '../utils/api';
import { IPokemonDetail, IDefense, IStat } from '../utils/interfaces';

const useStyles = makeStyles({
  capitalize: {
    textTransform: 'capitalize'
  },
  table: {
    minWidth: 650
  },
  formControl: {
    minWidth: '100%',
    marginBottom: '20px'
  }
});

const PokemonDetail: React.FC = () => {
  const classes = useStyles();

  const { pokemon } = useParams();

  const [pokemonDetail, setPokemonDetail] = useState<IPokemonDetail | null>(null);

  useEffect(() => {
    const pokemonName = pokemon || '';
    const loadPokemonDetail = async () => {
      const detail = await getPokemonDetail(pokemonName);
      setPokemonDetail(detail);
    };
    loadPokemonDetail();
  }, [pokemon]);

  return (
    <React.Fragment>
      <Typography variant="h3" className={classes.capitalize}>
        {pokemonDetail?.name}
      </Typography>
      <div>
        {pokemonDetail?.types.map((type: string) => (
          <TypeLabel type={type} />
        ))}
      </div>
      <div>
        <img src={pokemonDetail?.frontPictureUrl} />
        <img src={pokemonDetail?.backPictureUrl} />
      </div>
      <Typography variant="h5">National #{pokemonDetail?.number}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm="auto" md={6}>
          <Typography variant="h4">Base stats</Typography>
          {pokemonDetail?.stats.map((stat: IStat) => (
            <StatProgressBar {...stat} />
          ))}
        </Grid>
        <Grid item xs={12} sm="auto" md={6}>
          <Typography variant="h4">Defenses</Typography>
          <Typography paragraph>The effect that different types of attack have on this Pokémon</Typography>
          {pokemonDetail?.defenses.map((def: IDefense) => (
            <Defense {...def} />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PokemonDetail;
