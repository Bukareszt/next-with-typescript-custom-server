import express from 'express';
import next from 'next';
import connectionWithMongo from '../server/db/connection';
import userRoutes from './routes/index';
import { prepareServer } from './utills/initialization';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.SERVER_PORT;
const dev = true;

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server: express.Application = express();

    connectionWithMongo();

    prepareServer(server);

    server.use('/nieapi', userRoutes);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
