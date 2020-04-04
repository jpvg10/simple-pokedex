import axios from 'axios';
import { RequestHandler } from 'express';

export const getPokedex: RequestHandler = async (req, res, next) => {
  const pokedexName = req.params.name;
  const result = await axios.get(`https://pokeapi.co/api/v2/pokedex/${pokedexName}/`);

  const pokedex = result.data;
  const arrayPokemon = pokedex.pokemon_entries.map((pokemon: any) => {
    const id = pokemon.entry_number;
    const name = pokemon.pokemon_species.name;
    return { id, name };
  });

  res.send(arrayPokemon);
};
