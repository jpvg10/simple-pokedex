import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, makeStyles, List, ListItem, ListItemText, Card, CardContent } from '@material-ui/core';
import pokedex from './pokedex.png';
import { getPoxedexes } from '../utils/api';
import { IPokedex } from '../utils/interfaces';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
  },
  card: {
    paddingBottom: '16px !important',
    textTransform: 'capitalize'
  }
}));

const Explore: React.FC = () => {
  const classes = useStyles();

  const [pokedexes, setPokedexes] = useState<IPokedex[]>([]);

  useEffect(() => {
    const loadPokedex = async () => {
      const result = await getPoxedexes();
      setPokedexes(result);
    };
    loadPokedex();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h3">Pokédex</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent className={classes.card}>
              <List component="nav" aria-label="main mailbox folders">
                {pokedexes.map((pokedex: IPokedex) => (
                  <Link to={`/pokedex-details/${pokedex.id}`} key={pokedex.id}>
                    <ListItem button>
                      <ListItemText primary={pokedex.name} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={pokedex} alt="Pokéball" className={classes.image} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Explore;
