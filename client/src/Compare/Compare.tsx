import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { makeStyles, Grid, Button } from '@material-ui/core';
import { getPokedexDetail, getPokemonDetail } from '../utils/api';
import { IPokemonBasic, IPokemonDetail } from '../utils/interfaces';
import PokemonDetail from '../PokemonDetail';
import ErrorUnknown from '../ErrorUnknown';
import Spinner from '../Spinner';
import { ERequestStatus } from '../utils/enums';

const useStyles = makeStyles(() => ({
  select: {
    textTransform: 'capitalize',
    fontFamily: 'Roboto, Helvetica, Arial, "sans-serif"'
  }
}));

interface ISelectOptions {
  value: string;
  label: string;
}

const Compare: React.FC = () => {
  const classes = useStyles();

  const [pokemonList, setPokemonList] = useState<ISelectOptions[]>([]);
  const [listRequestStatus, setListRequestStatus] = useState<ERequestStatus>(ERequestStatus.LOADING);

  useEffect(() => {
    const loadPokemonList = async () => {
      try {
        const detail = await getPokedexDetail('national');
        const list: ISelectOptions[] = detail.pokemon.map((poke: IPokemonBasic) => ({
          value: poke.id,
          label: poke.name
        }));
        setPokemonList(list);
        setSelected([list[0], list[0]]);
        setListRequestStatus(ERequestStatus.LOADED);
      } catch (e) {
        console.log(e);
        setListRequestStatus(ERequestStatus.FAILED);
      }
    };
    loadPokemonList();
  }, []);

  const [selected, setSelected] = useState<ISelectOptions[]>([]);

  const handler = (index: number) => (selectedOption: any): void => {
    const newSelected = [...selected];
    newSelected[index] = selectedOption as ISelectOptions;
    setSelected(newSelected);
  };

  const [pokemonData, setPokemonData] = useState<IPokemonDetail[]>([]);
  const lastCalledRef = useRef<string[]>(['', '']);
  const [pokemonRequestStatus, setPokemonRequestStatus] = useState<ERequestStatus>(ERequestStatus.NOT_LOADED);

  const onClickGo = async () => {
    try {
      setPokemonRequestStatus(ERequestStatus.LOADING);
      const state = [...pokemonData];
      if (lastCalledRef.current[0] !== selected[0].value) {
        state[0] = await getPokemonDetail(selected[0].label);
      }
      if (lastCalledRef.current[1] !== selected[1].value) {
        state[1] = await getPokemonDetail(selected[1].label);
      }
      setPokemonData(state);
      setPokemonRequestStatus(ERequestStatus.LOADED);
      lastCalledRef.current = [selected[0].value, selected[1].value];
    } catch (e) {
      console.log(e);
      setPokemonRequestStatus(ERequestStatus.FAILED);
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Select options={pokemonList} value={selected[0]} onChange={handler(0)} className={classes.select} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Select options={pokemonList} value={selected[1]} onChange={handler(1)} className={classes.select} />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={onClickGo}>
            Go!
          </Button>
        </Grid>
      </Grid>
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
