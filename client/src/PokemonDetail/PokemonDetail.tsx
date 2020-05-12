import React from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
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
      <Typography variant="h3" className="capitalize">
        {pokemonDetail?.name}
      </Typography>
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
      <Typography variant="h5">National #{pokemonDetail?.number}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm="auto" md={6}>
          <Typography variant="h4">Base stats</Typography>
          {pokemonDetail?.stats.map((stat: IStat) => (
            <StatProgressBar key={stat.name} {...stat} />
          ))}
        </Grid>
        <Grid item xs={12} sm="auto" md={6}>
          <Typography variant="h4">Defenses</Typography>
          <Typography paragraph>The effect that different types of attack have on this Pokémon</Typography>
          {pokemonDetail?.defenses.map((def: IDefense) => (
            <Defense key={def.type} {...def} />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PokemonDetail;
