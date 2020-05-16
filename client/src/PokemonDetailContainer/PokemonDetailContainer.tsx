import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import ErrorUnknown from '../ErrorUnknown';
import { getPokemonDetail } from '../utils/api';
import { IPokemonDetail } from '../utils/interfaces';
import { ERequestStatus } from '../utils/enums';
import Spinner from '../Spinner';

const PokemonDetailContainer: React.FC = () => {
  const { pokemon } = useParams();
  const history = useHistory();

  const [pokemonDetail, setPokemonDetail] = useState<IPokemonDetail | null>(null);
  const [requestStatus, setRequestStatus] = useState<ERequestStatus>(ERequestStatus.LOADING);

  useEffect(() => {
    const pokemonName = pokemon || '';
    const loadPokemonDetail = async () => {
      try {
        const detail = await getPokemonDetail(pokemonName);
        setPokemonDetail(detail);
        setRequestStatus(ERequestStatus.LOADED);
      } catch (e) {
        if (e && e.response && e.response.status === 404) {
          history.replace('/404');
        } else {
          console.log(e);
          setRequestStatus(ERequestStatus.FAILED);
        }
      }
    };
    loadPokemonDetail();
  }, [pokemon, history]);

  if (requestStatus === ERequestStatus.LOADING) {
    return <Spinner />;
  }

  if (requestStatus === ERequestStatus.FAILED) {
    return <ErrorUnknown />;
  }

  return <PokemonDetail pokemonDetail={pokemonDetail} />;
};

export default PokemonDetailContainer;
