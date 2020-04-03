import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  },
  navText: {
    textTransform: 'capitalize',
    letterSpacing: 'unset'
  },
  titleButon: {
    fontSize: '32px'
  }
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <div className={classes.title}>
            <Button color="inherit" className={`${classes.navText} ${classes.titleButon}`} component={Link} to="/">
              Simple Pokédex
            </Button>
          </div>
          <Button color="inherit" className={classes.navText} component={Link} to="/explore">
            Explore Pokédex
          </Button>
          <Button color="inherit" className={classes.navText} component={Link} to="/compare">
            Compare Pokémon
          </Button>
          <Button color="inherit" className={classes.navText} component={Link} to="/random-team">
            Random Pokémon Team
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
