import express, { Request, Response } from 'express';
import { getPokedex } from '../controller';

const router = express.Router();

router.get('/pokedex/:name', getPokedex);

router.get('/pokemon/:name', (req: Request, res: Response) => {
  res.json({
    message: 'pokemon'
  });
});

router.get('/random_team/:pokedex_name', (req: Request, res: Response) => {
  res.json({
    message: 'team'
  });
});

export default router;
