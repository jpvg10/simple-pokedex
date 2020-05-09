import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getPokedexDetail } from '../utils/api';
import { IPokedexDetail, IPokemonBasic } from '../utils/interfaces';

const useStyles = makeStyles({
  capitalize: {
    textTransform: 'capitalize'
  },
  table: {
    minWidth: 650
  },
  formControl: {
    minWidth: '100%',
    marginBottom: '20px'
  }
});

const PokedexDetail: React.FC = () => {
  const classes = useStyles();

  const { pokedex } = useParams();

  const [pokedexDetail, setPokedexDetail] = useState<IPokedexDetail | null>(null);

  useEffect(() => {
    const pokedexName = pokedex || '';
    const loadPokedexDetail = async () => {
      const detail = await getPokedexDetail(pokedexName);
      setPokedexDetail(detail);
    };
    loadPokedexDetail();
  }, [pokedex]);

  const [query, setQuery] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<{ value: string }>) => {
    setQuery(event.target.value);
  };

  const pokemonToDisplay = pokedexDetail?.pokemon.filter(
    (poke: IPokemonBasic) => query === '' || poke.name.includes(query)
  );

  const pokemonElements = pokemonToDisplay?.map((poke: IPokemonBasic) => {
    return (
      <TableRow key={poke.id}>
        <TableCell className={classes.capitalize}>{poke.name}</TableCell>
        <TableCell>
          <Link to={`/pokemon-details/${poke.name}`}>View Details</Link>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <React.Fragment>
      <Typography variant="h3" className={classes.capitalize}>
        {pokedexDetail?.name}
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <Input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryChange}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Pokémon Name</strong>
              </TableCell>
              <TableCell>
                <strong>Details</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{pokemonElements}</TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default PokedexDetail;
