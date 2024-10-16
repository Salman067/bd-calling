
import cors from 'cors';
import express from 'express';
import router from './src/routes/index.js';
import globalErrorHandler from './src/middlewares/globalErrorHandler.js';
import notFound from './src/middlewares/notFound.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  const serverStatus = {
    status: 'running',
    message: 'Express Train API is operational and running smoothly.',
    timestamp: new Date().toISOString(),
    version: 'v1.0.1',
    uptime: process.uptime(),
    author: {
      name: 'Md Abu Salman Hossain',
      email: 'salman120522@gmail.com',
    },
    contact: {
      name: 'Md Abu Salman Hossain',
      email: 'salman120522@gmail.com',
    },
  };

  res.json(serverStatus);
});

app.use('/api/v1', router);

app.use(globalErrorHandler); 
app.use(notFound);

export default app;
