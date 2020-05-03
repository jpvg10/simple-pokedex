import axios from 'axios';
import { IPokedex } from '../Common';

export const getPoxedexes = async (): Promise<IPokedex[]> => {
  try {
    const result = await axios.get<IPokedex[]>(`/api/pokedex/`);
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
