import axios from 'axios';
import { IPokedex, IPokedexDetail, IPokemonPicture, IPokemonDetail } from './interfaces';

export const getPoxedexes = async (): Promise<IPokedex[]> => {
  try {
    const result = await axios.get<IPokedex[]>(`/api/pokedex/`);
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getPokedexDetail = async (pokedex: string): Promise<IPokedexDetail> => {
  const result = await axios.get<IPokedexDetail>(`/api/pokedex/${pokedex}/`);
  return result.data;
};

export const getRandomTeam = async (pokedex: string): Promise<IPokemonPicture[]> => {
  try {
    const result = await axios.get<IPokemonPicture[]>(`/api/random-team/${pokedex}/`);
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getPokemonDetail = async (pokemon: string): Promise<IPokemonDetail> => {
  const result = await axios.get<IPokemonDetail>(`/api/pokemon/${pokemon}/`);
  return result.data;
};
