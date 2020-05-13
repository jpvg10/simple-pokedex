import React, { useState, useEffect } from 'react';
import { Typography, FormControl, InputLabel, makeStyles, Grid, Button } from '@material-ui/core';
import { getPokedexDetail } from '../utils/api';
import { IPokemonBasic } from '../utils/interfaces';
import Select from 'react-select';

const useStyles = makeStyles(() => ({
  select: {
    minWidth: '100%'
  }
}));

interface SelectOptions {
  value: string;
  label: string;
}

const Compare: React.FC = () => {
  const classes = useStyles();

  const [pokemonList, setPokemonList] = useState<SelectOptions[]>([]);
  const [selected, setSelected] = useState<SelectOptions[]>([]);

  useEffect(() => {
    const loadPokemonList = async () => {
      const detail = await getPokedexDetail('national');
      if (detail) {
        const list: SelectOptions[] = detail.pokemon.map((poke: IPokemonBasic) => ({
          value: poke.id,
          label: poke.name
        }));
        setPokemonList(list);
        setSelected([list[0], list[0]]);
      }
    };
    loadPokemonList();
  }, []);

  const handler = (index: number) => (selectedOption: any): void => {
    const newSelected = [...selected];
    newSelected[index] = selectedOption;
    setSelected(newSelected);
  };

  const onClickGo = async () => {
    console.log(selected);
  };

  return (
    <React.Fragment>
      <Typography variant="h3">Compare Pokémon</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <FormControl className={classes.select}>
            <InputLabel id="demo-simple-select-label">Choose a Pokémon</InputLabel>
            <Select options={pokemonList} value={selected[0]} onChange={handler(0)} className="capitalize" />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl className={classes.select}>
            <InputLabel id="demo-simple-select-label">Choose a Pokémon</InputLabel>
            <Select options={pokemonList} value={selected[1]} onChange={handler(1)} className="capitalize" />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={onClickGo}>
            Go!
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Compare;
