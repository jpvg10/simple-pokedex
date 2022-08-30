import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, withStyles } from '@material-ui/core';
import { IPokemonBasic } from '../utils/interfaces';

const styles = () => ({
  link: {
    color: '#0000EE',
    '&:visited': {
      color: '#0000EE'
    }
  }
});

interface IPokemonElementsProps {
  pokemonToDisplay: IPokemonBasic[];
  classes: any;
}

class PokemonElements extends React.PureComponent<IPokemonElementsProps, {}> {
  render() {
    const { pokemonToDisplay, classes } = this.props;
    const elements = pokemonToDisplay.map((poke: IPokemonBasic) => {
      return (
        <TableRow key={poke.id}>
          <TableCell className="capitalize">{poke.name}</TableCell>
          <TableCell>
            <Link to={`/pokemon-details/${poke.name}`} className={classes.link}>
              View Details
            </Link>
          </TableCell>
        </TableRow>
      );
    });
    return <React.Fragment>{elements}</React.Fragment>;
  }
}

export default withStyles(styles)(PokemonElements);
