import axios from 'axios';
import { RequestHandler } from 'express';

export const getPokedexes: RequestHandler = async (req, res) => {
  try {
    const result = await axios.get('https://pokeapi.co/api/v2/pokedex/');
    const arrayPokedex = result.data.results.map((pokedex: any) => {
      return {
        id: pokedex.name,
        name: pokedex.name.replace('-', ' ')
      };
    });
    res.status(200).send(arrayPokedex);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getPokedex: RequestHandler = async (req, res) => {
  try {
    const pokedexName = req.params.name;
    const result = await axios.get(`https://pokeapi.co/api/v2/pokedex/${pokedexName}/`);

    const pokedex = result.data;
    const arrayPokemon = pokedex.pokemon_entries.map((pokemon: any) => {
      return {
        id: pokemon.entry_number,
        name: pokemon.pokemon_species.name
      };
    });

    res.status(200).send(arrayPokemon);
  } catch (e) {
    res.status(500).send(e);
  }
};
