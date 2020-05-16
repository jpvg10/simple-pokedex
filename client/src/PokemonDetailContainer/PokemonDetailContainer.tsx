import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import { getPokemonDetail } from '../utils/api';
import { IPokemonDetail } from '../utils/interfaces';

const PokemonDetailContainer: React.FC = () => {
  const { pokemon } = useParams();
  const history = useHistory();

  const [pokemonDetail, setPokemonDetail] = useState<IPokemonDetail | null>(null);

  useEffect(() => {
    const pokemonName = pokemon || '';
    const loadPokemonDetail = async () => {
      try {
        const detail = await getPokemonDetail(pokemonName);
        setPokemonDetail(detail);
      } catch (e) {
        if (e && e.response && e.response.status === 404) {
          history.replace('/404');
        } else {
          console.log(e);
        }
      }
    };
    loadPokemonDetail();
  }, [pokemon]);

  return <PokemonDetail pokemonDetail={pokemonDetail} />;
};

export default PokemonDetailContainer;
