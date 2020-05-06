import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import StatProgressBar from './StatProgressBar';
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
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h4">Base stats</Typography>
          {pokemonDetail?.stats.map((stat: IStat) => (
            <StatProgressBar {...stat} />
          ))}
        </Grid>
        <Grid item>
          <Typography variant="h4">Defenses</Typography>
          {pokemonDetail?.defenses.map((def: IDefense) => (
            <React.Fragment>
              <TypeLabel type={def.type} />
              <span>{def.value}</span>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PokemonDetail;
