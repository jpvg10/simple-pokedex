import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import StatProgressBar from './StatProgressBar';
import Defense from './Defense';
import TypeLabel from './TypeLabel';
import { IDefense, IStat, IPokemonDetail } from '../utils/interfaces';

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

type Props = {
  pokemonDetail: IPokemonDetail | null;
};

const PokemonDetail = ({ pokemonDetail }: Props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h3 className="capitalize">{pokemonDetail?.name}</h3>
      <Grid container spacing={4}>
        <Grid item>
          <img src={pokemonDetail?.frontPictureUrl} alt="Pokemon front" />
          <img src={pokemonDetail?.backPictureUrl} alt="Pokemon back" />
        </Grid>
        <Grid item className={classes.center}>
          {pokemonDetail?.types.map((type: string) => (
            <TypeLabel key={type} type={type} />
          ))}
        </Grid>
      </Grid>
      <h5>National #{pokemonDetail?.number}</h5>
      <Grid container spacing={4}>
        <Grid item xs={12} sm="auto" md={6}>
          <h4>Base stats</h4>
          {pokemonDetail?.stats.map((stat: IStat) => (
            <StatProgressBar key={stat.name} {...stat} />
          ))}
        </Grid>
        <Grid item xs={12} sm="auto" md={6}>
          <h4>Defenses</h4>
          <p>The effect that different types of attack have on this Pokémon</p>
          {pokemonDetail?.defenses.map((def: IDefense) => (
            <Defense key={def.type} {...def} />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PokemonDetail;
