import React, { useState, useEffect, useRef } from 'react';
import { Grid, Button, TextField, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getPokedexDetail, getPokemonDetail } from '../../api';
import { IPokemonBasic, IPokemonDetail } from '../../utils/interfaces';
import PokemonDetail from '../PokemonDetail';
import ErrorUnknown from '../ErrorUnknown';
import Spinner from '../Spinner';
import { ERequestStatus } from '../../utils/enums';

const useStyles = makeStyles(() => ({
  error: {
    color: '#FF0000'
  },
  mb: {
    marginBottom: '20px'
  },
  root: {
    width: '300px'
  }
}));

const Compare: React.FC = () => {
  const classes = useStyles();

  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [listRequestStatus, setListRequestStatus] = useState<ERequestStatus>(ERequestStatus.LOADING);
  const [selected, setSelected] = useState<string[]>(['', '']);
  const [showError, setShowError] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<IPokemonDetail[]>([]);
  const lastCalledRef = useRef<string[]>(['', '']);
  const [pokemonRequestStatus, setPokemonRequestStatus] = useState<ERequestStatus>(ERequestStatus.NOT_LOADED);

  useEffect(() => {
    const loadPokemonList = async () => {
      try {
        const detail = await getPokedexDetail('national');
        const list = detail.pokemon.map((poke: IPokemonBasic) => poke.name);
        setPokemonList(list);
        setListRequestStatus(ERequestStatus.LOADED);
      } catch (e) {
        console.log(e);
        setListRequestStatus(ERequestStatus.FAILED);
      }
    };
    loadPokemonList();
  }, []);

  const handler =
    (index: number) =>
    (event: any, value: string | null): void => {
      const newSelected = [...selected];
      newSelected[index] = value ? value : '';
      if (newSelected[0] && newSelected[1]) {
        setShowError(false);
      }
      setSelected(newSelected);
    };

  const onClickGo = async () => {
    if (selected[0] && selected[1]) {
      try {
        setPokemonRequestStatus(ERequestStatus.LOADING);
        const state = [...pokemonData];
        if (lastCalledRef.current[0] !== selected[0]) {
          state[0] = await getPokemonDetail(selected[0]);
        }
        if (lastCalledRef.current[1] !== selected[1]) {
          state[1] = await getPokemonDetail(selected[1]);
        }
        setPokemonData(state);
        setPokemonRequestStatus(ERequestStatus.LOADED);
        lastCalledRef.current = [selected[0], selected[1]];
      } catch (e) {
        console.log(e);
        setPokemonRequestStatus(ERequestStatus.FAILED);
      }
    } else {
      setShowError(true);
    }
  };

  if (listRequestStatus === ERequestStatus.LOADING) {
    return <Spinner />;
  }

  if (listRequestStatus === ERequestStatus.FAILED) {
    return <ErrorUnknown />;
  }

  return (
    <React.Fragment>
      <h3>Compare Pokémon</h3>
      <Grid container spacing={2} className={classes.mb}>
        <Grid item xs={12} sm={5}>
          <Autocomplete
            openOnFocus={true}
            options={pokemonList}
            renderInput={(params: any) => <TextField {...params} label="Pick a Pokémon" variant="outlined" />}
            classes={{ root: classes.root, input: 'capitalize', option: 'capitalize' }}
            onChange={handler(0)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Autocomplete
            openOnFocus={true}
            options={pokemonList}
            renderInput={(params: any) => <TextField {...params} label="Pick a Pokémon" variant="outlined" />}
            classes={{ root: classes.root, input: 'capitalize', option: 'capitalize' }}
            onChange={handler(1)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={onClickGo}>
            Go!
          </Button>
        </Grid>
      </Grid>
      {showError && <p className={classes.error}>Please select Pokémon on both dropdowns!</p>}
      {pokemonRequestStatus === ERequestStatus.LOADING && <Spinner />}
      {pokemonRequestStatus === ERequestStatus.FAILED && <ErrorUnknown />}
      {pokemonRequestStatus === ERequestStatus.LOADED && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <PokemonDetail pokemonDetail={pokemonData[0]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PokemonDetail pokemonDetail={pokemonData[1]} />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Compare;
