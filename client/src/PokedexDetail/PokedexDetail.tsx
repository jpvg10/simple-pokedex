import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
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
import ErrorUnknown from '../ErrorUnknown';
import Spinner from '../Spinner';
import { getPokedexDetail } from '../utils/api';
import { IPokemonBasic, IPokedexDetail } from '../utils/interfaces';
import { ERequestStatus, ESpinnerSize } from '../utils/enums';

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
  requestStatus: ERequestStatus;
  isSearching: boolean;
}

interface PokedexDetailProps extends RouteComponentProps<{ pokedex: string }> {
  classes: any;
}

class PokedexDetail extends React.Component<PokedexDetailProps, PokedexDetailState> {
  state: PokedexDetailState = {
    name: '',
    query: '',
    pokemonToDisplay: [],
    requestStatus: ERequestStatus.LOADING,
    isSearching: false
  };

  allPokemon: IPokemonBasic[] = [];

  filterPokemon = debounce((query: string) => {
    const pokemonToDisplay = this.allPokemon.filter((poke) => query === '' || poke.name.includes(query));
    this.setState({ pokemonToDisplay, isSearching: false });
  }, 200);

  componentDidMount() {
    const { pokedex } = this.props.match.params;
    getPokedexDetail(pokedex)
      .then((data: IPokedexDetail) => {
        this.setState({
          name: data.name,
          pokemonToDisplay: data.pokemon,
          requestStatus: ERequestStatus.LOADED
        });
        this.allPokemon = data.pokemon;
      })
      .catch((e) => {
        if (e && e.response && e.response.status === 404) {
          this.props.history.replace('/404');
        } else {
          console.log(e);
          this.setState({ requestStatus: ERequestStatus.FAILED });
        }
      });
  }

  onQueryChange = (event: React.ChangeEvent<{ value: string }>) => {
    const query = event.target.value;
    this.setState({ query, isSearching: true }, () => {
      this.filterPokemon(query);
    });
  };

  render() {
    const { name, pokemonToDisplay, query, requestStatus, isSearching } = this.state;
    const { classes } = this.props;

    if (requestStatus === ERequestStatus.LOADING) {
      return <Spinner />;
    }

    if (requestStatus === ERequestStatus.FAILED) {
      return <ErrorUnknown />;
    }

    return (
      <React.Fragment>
        <h3 className="capitalize">{name}</h3>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="search-input">Search</InputLabel>
          <Input
            id="search-input"
            type="text"
            value={query}
            onChange={this.onQueryChange}
            startAdornment={
              <InputAdornment position="start">
                <Spinner show={isSearching} size={ESpinnerSize.SM} />
              </InputAdornment>
            }
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
