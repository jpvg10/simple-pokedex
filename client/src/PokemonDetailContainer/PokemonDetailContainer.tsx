import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import { getPokemonDetail } from '../utils/api';
import { IPokemonDetail } from '../utils/interfaces';

const PokemonDetailContainer: React.FC = () => {
  const { pokemon } = useParams();

  const [pokemonDetail, setPokemonDetail] = useState<IPokemonDetail | null>(null);

  useEffect(() => {
    const pokemonName = pokemon || '';
    const loadPokemonDetail = async () => {
      const detail = await getPokemonDetail(pokemonName);
      setPokemonDetail(detail);
    };
    loadPokemonDetail();
  }, [pokemon]);

  return <PokemonDetail pokemonDetail={pokemonDetail} />;
};

export default PokemonDetailContainer;
