import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  makeStyles,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
  },
  drawer: {
    width: '250px'
  }
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <React.Fragment>
      <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
        <List className={classes.drawer}>
          <ListItem button component={Link} to="/explore" onClick={toggleDrawer}>
            <ListItemText primary="Explore" />
          </ListItem>
          <ListItem button component={Link} to="/compare" onClick={toggleDrawer}>
            <ListItemText primary="Compare Pokémon" />
          </ListItem>
          <ListItem button component={Link} to="/random-team" onClick={toggleDrawer}>
            <ListItemText primary="Random Pokémon Team" />
          </ListItem>
        </List>
      </Drawer>
      <AppBar>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <div className={classes.title}>
              <Box display={{ xs: 'inline-block', md: 'none' }}>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              </Box>
              <Button color="inherit" className={`${classes.navText} ${classes.titleButon}`} component={Link} to="/">
                Simple Pokédex
              </Button>
            </div>
            <Box display={{ xs: 'none', md: 'block' }}>
              <Button color="inherit" className={classes.navText} component={Link} to="/explore">
                Explore Pokédex
              </Button>
              <Button color="inherit" className={classes.navText} component={Link} to="/compare">
                Compare Pokémon
              </Button>
              <Button color="inherit" className={classes.navText} component={Link} to="/random-team">
                Random Pokémon Team
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
