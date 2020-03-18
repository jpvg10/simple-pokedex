import React from 'react';
import { makeStyles, Theme, AppBar, Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0
  }
}));

const year = new Date().getFullYear();

function Footer() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Typography paragraph>
              {`Powered by the `}
              <a target="_blank" rel="noopener noreferrer" href="https://pokeapi.co/">
                Pokéapi
              </a>
            </Typography>
            <Typography paragraph>Juan Pablo Valencia, {year}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography paragraph>Find this on GitHub</Typography>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}

export default Footer;
