import express, { Request, Response } from 'express';
import { getPokedexes, getPokemonFromPokedex, getPokemon, getRandomTeam } from '../controller';

const router = express.Router();

router.get('/pokedex/', getPokedexes);

router.get('/pokemon/', getPokemonFromPokedex);

router.get('/pokemon/:name', getPokemon);

router.get('/random_team/:pokedex', getRandomTeam);

export default router;
