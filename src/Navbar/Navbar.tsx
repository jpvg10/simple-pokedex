import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar,
  title: {
    flexGrow: 1
  }
}));

function Navbar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar>
        <Container>
          <Toolbar disableGutters>
            <div className={classes.title}>
              <Button color="inherit" component={Link} to="/">
                Simple Pokédex
              </Button>
            </div>
            <Button color="inherit" component={Link} to="/explore">
              Explore Pokédex
            </Button>
            <Button color="inherit" component={Link} to="/compare">
              Compare Pokémon
            </Button>
            <Button color="inherit" component={Link} to="/random-team">
              Random Pokémon Team
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  );
}

export default Navbar;
