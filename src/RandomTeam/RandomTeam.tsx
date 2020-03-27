import React from 'react';
import { Typography, Grid, makeStyles, Theme, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import badges from './badges.png';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
    height: 'auto'
  },
  select: {
    minWidth: '100%'
  }
}));

const RandomTeam: React.FC = () => {
  const classes = useStyles();
  const [pokedex, setPokedex] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPokedex(event.target.value as string);
  };

  return (
    <React.Fragment>
      <Typography variant="h3">Get a random Pokémon Team</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <FormControl className={classes.select}>
            <InputLabel id="demo-simple-select-label">Pick a Pokédex</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={pokedex} onChange={handleChange}>
              <MenuItem value={'National'}>National</MenuItem>
              <MenuItem value={'Kanto'}>Kanto</MenuItem>
            </Select>
          </FormControl>
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
