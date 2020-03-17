import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <Link to="/">Simple Pokédex</Link>
      <Link to="/explore">Explore Pokédex</Link>
      <Link to="/compare">Compare Pokémon</Link>
      <Link to="/random-team">Random Pokémon Team</Link>
    </div>
  );
}

export default Navbar;
