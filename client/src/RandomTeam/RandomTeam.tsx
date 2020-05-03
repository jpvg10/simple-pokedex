import React, { useState, useEffect } from 'react';
import { Typography, Grid, makeStyles, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import badges from './badges.png';
import Pokemon from './Pokemon';
import { getPoxedexes, getRandomTeam } from '../Api';
import { IPokedex, IPokemonPicture } from '../Common';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
  },
  select: {
    minWidth: '100%',
    textTransform: 'capitalize'
  },
  menuItem: {
    textTransform: 'capitalize'
  }
}));

const RandomTeam: React.FC = () => {
  const classes = useStyles();

  const [pokedexes, setPokedexes] = useState([] as IPokedex[]);
  const [selectedPokedex, setSelectedPokedex] = useState('');

  useEffect(() => {
    const loadPokedex = async () => {
      const result = await getPoxedexes();
      setPokedexes(result);
      setSelectedPokedex(result[0].id);
    };
    loadPokedex();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedPokedex(event.target.value as string);
  };

  const [team, setTeam] = useState<IPokemonPicture[]>([]);

  const onClickGo = async () => {
    const randomTeam = await getRandomTeam(selectedPokedex);
    setTeam(randomTeam);
  };

  const teamElements = team.map((poke) => (
    <Grid item>
      <Pokemon {...poke} />
    </Grid>
  ));

  return (
    <React.Fragment>
      <Typography variant="h3">Get a random Pokémon Team</Typography>
      <Grid container spacing={2}>
        <Grid container spacing={2} item xs={12} md={8}>
          <Grid item xs={10}>
            <FormControl className={classes.select}>
              <InputLabel id="pokedex-select-label">Pick a Pokédex</InputLabel>
              <Select
                labelId="pokedex-select-label"
                id="pokedex-select"
                value={selectedPokedex}
                onChange={handleChange}
              >
                {pokedexes.map((pokedex) => (
                  <MenuItem value={pokedex.id} key={pokedex.id} className={classes.menuItem}>
                    {pokedex.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={onClickGo}>
              Go!
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={badges} alt="Pokéball" className={classes.image} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {teamElements}
      </Grid>
      <Typography variant="h5">Can you beat the Elite Four with this team?</Typography>
    </React.Fragment>
  );
};

export default RandomTeam;
