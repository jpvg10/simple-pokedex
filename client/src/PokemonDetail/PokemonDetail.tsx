import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import StatProgressBar from './StatProgressBar';
import Defense from './Defense';
import TypeLabel from './TypeLabel';
import { getPokemonDetail } from '../utils/api';
import { IPokemonDetail, IDefense, IStat } from '../utils/interfaces';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  formControl: {
    minWidth: '100%',
    marginBottom: '20px'
  },
  center: {
    display: 'flex',
    alignItems: 'center'
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
      <Typography variant="h3" className="capitalize">
        {pokemonDetail?.name}
      </Typography>
      <Grid container spacing={4}>
        <Grid item>
          <img src={pokemonDetail?.frontPictureUrl} alt="Pokemon front" />
          <img src={pokemonDetail?.backPictureUrl} alt="Pokemon back" />
        </Grid>
        <Grid item className={classes.center}>
          {pokemonDetail?.types.map((type: string, index: number) => (
            <TypeLabel key={index} type={type} />
          ))}
        </Grid>
      </Grid>
      <Typography variant="h5">National #{pokemonDetail?.number}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm="auto" md={6}>
          <Typography variant="h4">Base stats</Typography>
          {pokemonDetail?.stats.map((stat: IStat, index: number) => (
            <StatProgressBar key={index} {...stat} />
          ))}
        </Grid>
        <Grid item xs={12} sm="auto" md={6}>
          <Typography variant="h4">Defenses</Typography>
          <Typography paragraph>The effect that different types of attack have on this Pokémon</Typography>
          {pokemonDetail?.defenses.map((def: IDefense, index: number) => (
            <Defense key={index} {...def} />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PokemonDetail;
