import React from 'react';
import { Typography, Grid, makeStyles, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import badges from './badges.png';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
  },
  select: {
    minWidth: '100%'
  }
}));

const RandomTeam: React.FC = () => {
  const classes = useStyles();

  const pokedexList = ['National', 'Kanto'];

  const [pokedex, setPokedex] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setPokedex(event.target.value as number);
  };

  return (
    <React.Fragment>
      <Typography variant="h3">Get a random Pokémon Team</Typography>
      <Grid container spacing={2}>
        <Grid container spacing={2} item xs={12} md={8}>
          <Grid item xs={10}>
            <FormControl className={classes.select}>
              <InputLabel id="demo-simple-select-label">Pick a Pokédex</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pokedex}
                onChange={handleChange}
              >
                {pokedexList.map((name, index) => (
                  <MenuItem value={index} key={index}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary">
              Go!
            </Button>
          </Grid>
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
