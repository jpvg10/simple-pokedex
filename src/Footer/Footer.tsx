import React from 'react';
import { makeStyles, AppBar, Container, Link } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  footer: {
    top: 'auto',
    bottom: 0,
    marginTop: '20px'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px'
  }
}));

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.footer} position="static">
      <Container maxWidth="md">
        <div className={classes.flexContainer}>
          <div>
            <p>
              {`Powered by the `}
              <Link
                color="inherit"
                underline="always"
                target="_blank"
                rel="noopener noreferrer"
                href="https://pokeapi.co/"
              >
                Pokéapi
              </Link>
            </p>
            <p>Juan Pablo Valencia, {year}</p>
          </div>
          <div>
            <p>
              <Link
                color="inherit"
                underline="always"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/jpvg10/simple-pokedex"
              >
                Find this on GitHub
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </AppBar>
  );
};

export default Footer;
