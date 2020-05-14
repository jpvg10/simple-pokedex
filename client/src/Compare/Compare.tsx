import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { Typography, makeStyles, Grid, Button } from '@material-ui/core';
import { getPokedexDetail, getPokemonDetail } from '../utils/api';
import { IPokemonBasic, IPokemonDetail } from '../utils/interfaces';
import PokemonDetail from '../PokemonDetail';

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

  useEffect(() => {
    const loadPokemonList = async () => {
      const detail = await getPokedexDetail('national');
      if (detail) {
        const list: ISelectOptions[] = detail.pokemon.map((poke: IPokemonBasic) => ({
          value: poke.id,
          label: poke.name
        }));
        setPokemonList(list);
        setSelected([list[0], list[0]]);
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

  const onClickGo = async () => {
    console.log(selected);
    const state = [...pokemonData];
    if (lastCalledRef.current[0] !== selected[0].value) {
      const data = await getPokemonDetail(selected[0].label);
      if (data) state[0] = data;
    }
    if (lastCalledRef.current[1] !== selected[1].value) {
      const data = await getPokemonDetail(selected[1].label);
      if (data) state[1] = data;
    }
    setPokemonData(state);
    lastCalledRef.current = [selected[0].value, selected[1].value];
  };

  return (
    <React.Fragment>
      <Typography variant="h3">Compare Pokémon</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Select options={pokemonList} value={selected[0]} onChange={handler(0)} className={classes.select} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Select options={pokemonList} value={selected[1]} onChange={handler(1)} className={classes.select} />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={onClickGo}>
            Go!
          </Button>
        </Grid>
      </Grid>
      {pokemonData.length !== 0 && (
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
