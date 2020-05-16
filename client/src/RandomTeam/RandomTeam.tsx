import React, { useState, useEffect } from 'react';
import { Typography, Grid, makeStyles, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import badges from './badges.png';
import Pokemon from './Pokemon';
import ErrorUnknown from '../ErrorUnknown';
import Spinner from '../Spinner';
import { getPoxedexes, getRandomTeam } from '../utils/api';
import { IPokedex, IPokemonPicture } from '../utils/interfaces';
import { ERequestStatus } from '../utils/enums';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
  },
  select: {
    minWidth: '100%',
    textTransform: 'capitalize'
  }
}));

const RandomTeam: React.FC = () => {
  const classes = useStyles();

  const [pokedexes, setPokedexes] = useState<IPokedex[]>([]);
  const [selectedPokedex, setSelectedPokedex] = useState('');
  const [pokedexRequestStatus, setPokedexRequestStatus] = useState<ERequestStatus>(ERequestStatus.LOADING);
  const [pokemonRequestStatus, setPokemonRequestStatus] = useState<ERequestStatus>(ERequestStatus.LOADING);

  useEffect(() => {
    const loadPokedex = async () => {
      try {
        const result = await getPoxedexes();
        setPokedexes(result);
        setSelectedPokedex(result[0].id);
        setPokedexRequestStatus(ERequestStatus.LOADED);
      } catch (e) {
        console.log(e);
        setPokedexRequestStatus(ERequestStatus.FAILED);
      }
    };
    loadPokedex();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedPokedex(event.target.value as string);
  };

  const [team, setTeam] = useState<IPokemonPicture[]>([]);

  const onClickGo = async () => {
    try {
      const randomTeam = await getRandomTeam(selectedPokedex);
      setTeam(randomTeam);
      setPokemonRequestStatus(ERequestStatus.LOADED);
    } catch (e) {
      console.log(e);
      setPokemonRequestStatus(ERequestStatus.FAILED);
    }
  };

  if (pokedexRequestStatus === ERequestStatus.LOADING) {
    return <Spinner />;
  }

  if (pokedexRequestStatus === ERequestStatus.FAILED || pokemonRequestStatus === ERequestStatus.FAILED) {
    return <ErrorUnknown />;
  }

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
                {pokedexes.map((pokedex: IPokedex) => (
                  <MenuItem value={pokedex.id} key={pokedex.id} className="capitalize">
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
        {team.map((poke: IPokemonPicture) => (
          <Grid item key={poke.name}>
            <Pokemon {...poke} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5">Can you beat the Elite Four with this team?</Typography>
    </React.Fragment>
  );
};

export default RandomTeam;
