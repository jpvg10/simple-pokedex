import React from 'react';
import {
  Typography,
  Grid,
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent
} from '@material-ui/core';
import pokedex from './pokedex.png';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
  },
  card: {
    paddingBottom: '16px !important'
  }
}));

const Explore: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h3">Pokédex</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent className={classes.card}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemText primary="National" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Kanto" />
                </ListItem>
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
