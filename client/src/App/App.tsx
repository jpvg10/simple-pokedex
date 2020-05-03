import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Compare from '../Compare';
import Explore from '../Explore';
import Footer from '../Footer';
import Home from '../Home';
import Navbar from '../Navbar';
import RandomTeam from '../RandomTeam';
import PokedexDetail from '../PokedexDetail';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  container: {
    flex: '1 0 auto',
    paddingTop: '68px'
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Navbar />
      <Container maxWidth="md" className={classes.container}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/compare" exact component={Compare} />
          <Route path="/explore" exact component={Explore} />
          <Route path="/random-team" exact component={RandomTeam} />
          <Route path="/pokedex-details/:pokedex" exact component={PokedexDetail} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
