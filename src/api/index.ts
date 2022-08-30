import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { IPokedex, IPokedexDetail, IPokemonPicture, IPokemonDetail } from '../utils/interfaces';

const axiosInstance = Axios.create();
const axios = setupCache(axiosInstance);

export const getPoxedexes = async (): Promise<IPokedex[]> => {
  const result = await axios.get('https://pokeapi.co/api/v2/pokedex/');
  const arrayPokedex: IPokedex[] = result.data.results.map((pokedex: any) => {
    return {
      id: pokedex.name,
      name: pokedex.name.replace('-', ' ')
    };
  });
  return arrayPokedex;
};

export const getPokedexDetail = async (pokedexName: string): Promise<IPokedexDetail> => {
  const result = await axios.get(`https://pokeapi.co/api/v2/pokedex/${pokedexName}/`);
  const pokedex = result.data;

  const arrayPokemon = pokedex.pokemon_entries.map((pokemon: any) => {
    return {
      id: pokemon.entry_number,
      name: pokemon.pokemon_species.name
    };
  });

  const pokedexData: IPokedexDetail = {
    name: pokedex.name.replace('-', ' '),
    pokemon: arrayPokemon
  };

  return pokedexData;
};

export const getPokemonDetail = async (pokemonName: string): Promise<IPokemonDetail> => {
  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
  const pokemon = result.data;

  const arrayTypes = pokemon.types.map((type: any) => type.type.name);

  const arrayStats = pokemon.stats.map((stat: any) => {
    return {
      name: stat.stat.name.replace('-', ' '),
      baseStat: stat.base_stat
    };
  });

  const abilityPromises = pokemon.abilities.map((ability: any) => axios.get(ability.ability.url));
  const abilityResponses = await Promise.all(abilityPromises);
  const arrayAbilities = abilityResponses.map((response: any) => {
    return {
      name: response.data.name.replace('-', ' '),
      effect: response.data.effect_entries[0].effect
    };
  });

  const typePromises = pokemon.types.map((type: any) => axios.get(type.type.url));
  const typeResponses = await Promise.all(typePromises);

  const defensesMap = new Map();
  for (const response of typeResponses) {
    const damageRelations = (response as any).data.damage_relations;
    damageRelations.no_damage_from.forEach((element: any) => {
      defensesMap.set(element.name, 0);
    });
    damageRelations.half_damage_from.forEach((element: any) => {
      if (defensesMap.has(element.name)) {
        const def = defensesMap.get(element.name);
        defensesMap.set(element.name, def * 0.5);
      } else {
        defensesMap.set(element.name, 0.5);
      }
    });
    damageRelations.double_damage_from.forEach((element: any) => {
      if (defensesMap.has(element.name)) {
        const def = defensesMap.get(element.name);
        defensesMap.set(element.name, def * 2);
      } else {
        defensesMap.set(element.name, 2);
      }
    });
  }

  const arrayDefenses: any[] = [];
  defensesMap.forEach((value, key) => {
    if (value !== 1) {
      arrayDefenses.push({ type: key, value });
    }
  });

  const pokemonData: IPokemonDetail = {
    name: pokemon.name,
    number: pokemon.id,
    frontPictureUrl: pokemon.sprites.front_default,
    backPictureUrl: pokemon.sprites.back_default,
    types: arrayTypes,
    stats: arrayStats,
    abilities: arrayAbilities,
    defenses: arrayDefenses
  };

  return pokemonData;
};

export const getRandomTeam = async (pokedexName: string): Promise<IPokemonPicture[]> => {
  const pokedexResult = await axios.get(`https://pokeapi.co/api/v2/pokedex/${pokedexName}/`);
  const pokedex = pokedexResult.data;

  const count = pokedex.pokemon_entries.length;
  const pokemonPromises: Promise<any>[] = [];
  for (let i = 0; i < 6; i++) {
    const chosen = Math.floor(Math.random() * count);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokedex.pokemon_entries[chosen].pokemon_species.name}/`;
    pokemonPromises.push(axios.get(url));
  }

  const pokemonResponses = await Promise.all(pokemonPromises);
  const arrayPokemon: IPokemonPicture[] = pokemonResponses.map((response: any) => {
    return {
      name: response.data.name,
      pictureUrl: response.data.sprites.front_default
    };
  });

  return arrayPokemon;
};
