import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PokemonDetail from '../PokemonDetail';
import ErrorUnknown from '../ErrorUnknown';
import Spinner from '../Spinner';
import { getPokemonDetail } from '../../api';
import { IPokemonDetail } from '../../utils/interfaces';
import { ERequestStatus } from '../../utils/enums';

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

  return <PokemonDetail pokemonDetail={pokemonDetail} showAbilities={true} />;
};

export default PokemonDetailContainer;
