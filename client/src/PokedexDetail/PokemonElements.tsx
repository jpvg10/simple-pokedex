import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@material-ui/core';
import { IPokemonBasic } from '../utils/interfaces';

class PokemonElements extends React.PureComponent<{ pokemonToDisplay: IPokemonBasic[] }, {}> {
  render() {
    const { pokemonToDisplay } = this.props;
    const elements = pokemonToDisplay.map((poke: IPokemonBasic) => {
      return (
        <TableRow key={poke.id}>
          <TableCell className="capitalize">{poke.name}</TableCell>
          <TableCell>
            <Link to={`/pokemon-details/${poke.name}`}>View Details</Link>
          </TableCell>
        </TableRow>
      );
    });
    return <React.Fragment>{elements}</React.Fragment>;
  }
}

export default PokemonElements;
