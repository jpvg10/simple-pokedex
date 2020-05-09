import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  withStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash.debounce';
import PokemonElements from './PokemonElements';
import { getPokedexDetail } from '../utils/api';
import { IPokemonBasic, IPokedexDetail } from '../utils/interfaces';

const styles = () => ({
  table: {
    minWidth: 650
  },
  formControl: {
    minWidth: '100%',
    marginBottom: '20px'
  }
});

interface PokedexDetailState {
  name: string;
  query: string;
  pokemonToDisplay: IPokemonBasic[];
}

interface PokedexDetailProps extends RouteComponentProps<{ pokedex: string }> {
  classes: any;
}

class PokedexDetail extends React.Component<PokedexDetailProps, PokedexDetailState> {
  state: PokedexDetailState = {
    name: '',
    query: '',
    pokemonToDisplay: []
  };

  allPokemon: IPokemonBasic[] = [];

  filterPokemon = debounce((query: string) => {
    const pokemonToDisplay = this.allPokemon.filter((poke) => query === '' || poke.name.includes(query));
    this.setState({ pokemonToDisplay });
  }, 200);

  componentDidMount() {
    const { pokedex } = this.props.match.params;
    getPokedexDetail(pokedex).then((data: IPokedexDetail | null) => {
      if (data) {
        this.setState({
          name: data.name,
          pokemonToDisplay: data.pokemon
        });
        this.allPokemon = data.pokemon;
      }
    });
  }

  onQueryChange = (event: React.ChangeEvent<{ value: string }>) => {
    const query = event.target.value;
    this.setState({ query }, () => {
      this.filterPokemon(query);
    });
  };

  render() {
    const { name, pokemonToDisplay, query } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h3" className="capitalize">
          {name}
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="search-input">Search</InputLabel>
          <Input
            id="search-input"
            type="text"
            value={query}
            onChange={this.onQueryChange}
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
            <TableBody>
              <PokemonElements pokemonToDisplay={pokemonToDisplay} />
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PokedexDetail);
