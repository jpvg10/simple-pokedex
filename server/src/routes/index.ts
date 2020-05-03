import express from 'express';
import { getPokedexes, getPokedexDetail, getPokemon, getRandomTeam } from '../controller';

const router = express.Router();

router.get('/pokedex/', getPokedexes);

router.get('/pokedex/:name', getPokedexDetail);

router.get('/pokemon/:name', getPokemon);

router.get('/random_team/:pokedex', getRandomTeam);

export default router;
