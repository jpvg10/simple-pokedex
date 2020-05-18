import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, makeStyles, List, ListItem, ListItemText, Card, CardContent } from '@material-ui/core';
import pokedex from './pokedex.png';
import ErrorUnknown from '../ErrorUnknown';
import Spinner from '../Spinner';
import { getPoxedexes } from '../utils/api';
import { IPokedex } from '../utils/interfaces';
import { ERequestStatus } from '../utils/enums';

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
  const [requestStatus, setRequestStatus] = useState<ERequestStatus>(ERequestStatus.LOADING);

  useEffect(() => {
    const loadPokedex = async () => {
      try {
        const result = await getPoxedexes();
        setPokedexes(result);
        setRequestStatus(ERequestStatus.LOADED);
      } catch (e) {
        console.log(e);
        setRequestStatus(ERequestStatus.FAILED);
      }
    };
    loadPokedex();
  }, []);

  if (requestStatus === ERequestStatus.LOADING) {
    return <Spinner />;
  }

  if (requestStatus === ERequestStatus.FAILED) {
    return <ErrorUnknown />;
  }

  return (
    <React.Fragment>
      <h3>Pokédex</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent className={classes.card}>
              <List component="nav" aria-label="main mailbox folders">
                {pokedexes.map((pokedex: IPokedex) => (
                  <ListItem key={pokedex.id} button component={Link} to={`/pokedex-details/${pokedex.id}`}>
                    <ListItemText primary={pokedex.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={pokedex} alt="Pokéball" className={classes.image} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Explore;
