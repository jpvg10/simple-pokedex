import React from 'react';
import { makeStyles, AppBar, Container, Typography, Link } from '@material-ui/core';

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
            <Typography paragraph>
              {`Powered by the `}
              <Link color="inherit" target="_blank" rel="noopener noreferrer" href="https://pokeapi.co/">
                Pokéapi
              </Link>
            </Typography>
            <Typography paragraph>Juan Pablo Valencia, {year}</Typography>
          </div>
          <div>
            <Typography paragraph>Find this on GitHub</Typography>
          </div>
        </div>
      </Container>
    </AppBar>
  );
};

export default Footer;
