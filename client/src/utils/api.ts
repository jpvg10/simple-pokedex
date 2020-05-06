import axios from 'axios';
import { IPokedex, IPokedexDetail, IPokemonPicture } from './interfaces';

export const getPoxedexes = async (): Promise<IPokedex[]> => {
  try {
    const result = await axios.get<IPokedex[]>(`/api/pokedex/`);
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getPokedexDetail = async (pokedex: string): Promise<IPokedexDetail | null> => {
  try {
    const result = await axios.get<IPokedexDetail>(`/api/pokedex/${pokedex}/`);
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
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
