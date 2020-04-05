import axios from 'axios';

export const getPoxedexes = async () => {
  try {
    const result = await axios.get(`/api/pokedex/`);
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
