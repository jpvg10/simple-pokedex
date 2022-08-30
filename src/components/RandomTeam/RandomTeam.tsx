import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import badges from './badges.png';
import Pokemon from './Pokemon';
import ErrorUnknown from '../ErrorUnknown';
import Spinner from '../Spinner';
import { getPoxedexes, getRandomTeam } from '../../api';
import { IPokedex, IPokemonPicture } from '../../utils/interfaces';
import { ERequestStatus } from '../../utils/enums';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '200px'
  },
  select: {
    minWidth: '100%',
    textTransform: 'capitalize'
  },
  mb: {
    marginBottom: '20px'
  }
}));

const RandomTeam: React.FC = () => {
  const classes = useStyles();

  const [pokedexes, setPokedexes] = useState<IPokedex[]>([]);
  const [selectedPokedex, setSelectedPokedex] = useState('');
  const [pokedexRequestStatus, setPokedexRequestStatus] = useState<ERequestStatus>(ERequestStatus.LOADING);
  const [team, setTeam] = useState<IPokemonPicture[]>([]);
  const [teamRequestStatus, setTeamRequestStatus] = useState<ERequestStatus>(ERequestStatus.NOT_LOADED);

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

  const onClickGo = async () => {
    try {
      setTeamRequestStatus(ERequestStatus.LOADING);
      const randomTeam = await getRandomTeam(selectedPokedex);
      setTeam(randomTeam);
      setTeamRequestStatus(ERequestStatus.LOADED);
    } catch (e) {
      console.log(e);
      setTeamRequestStatus(ERequestStatus.FAILED);
    }
  };

  if (pokedexRequestStatus === ERequestStatus.LOADING) {
    return <Spinner />;
  }

  if (pokedexRequestStatus === ERequestStatus.FAILED) {
    return <ErrorUnknown />;
  }

  return (
    <React.Fragment>
      <h3>Get a random Pokémon Team</h3>
      <Grid container spacing={2} className={classes.mb}>
        <Grid container spacing={2} item xs={12} sm={8}>
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
        <Grid item xs={12} sm={4}>
          <img src={badges} alt="Gym badges" className={classes.image} />
        </Grid>
      </Grid>
      {teamRequestStatus === ERequestStatus.LOADING && <Spinner />}
      {teamRequestStatus === ERequestStatus.FAILED && <ErrorUnknown />}
      {teamRequestStatus === ERequestStatus.LOADED && (
        <Grid container spacing={2}>
          {team.map((poke: IPokemonPicture) => (
            <Grid item key={poke.name}>
              <Pokemon {...poke} />
            </Grid>
          ))}
        </Grid>
      )}
      <h5>Can you beat the Elite Four with this team?</h5>
    </React.Fragment>
  );
};

export default RandomTeam;
