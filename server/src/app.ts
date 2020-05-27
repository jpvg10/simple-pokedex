import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(morgan('dev'));

// static
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

// routes
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

// error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.message);
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
