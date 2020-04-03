import React from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Theme,
  Grid,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    minWidth: '100%'
  }
}));

const Compare: React.FC = () => {
  const classes = useStyles();

  const pokemonList = ['Pikachu', 'Charmander'];

  const [selected, setSelected] = React.useState([0, 0]);

  const handler = (index: number) => (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelected = [...selected];
    newSelected[index] = event.target.value as number;
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <Typography variant="h3">Compare Pokémon</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <FormControl className={classes.select}>
            <InputLabel id="demo-simple-select-label">Choose a Pokémon</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected[0]}
              onChange={handler(0)}
            >
              {pokemonList.map((name, index) => (
                <MenuItem value={index} key={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl className={classes.select}>
            <InputLabel id="demo-simple-select-label">Choose a Pokémon</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected[1]}
              onChange={handler(1)}
            >
              {pokemonList.map((name, index) => (
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
    </React.Fragment>
  );
};

export default Compare;
