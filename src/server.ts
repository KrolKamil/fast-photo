import express, {Request, Response, NextFunction, Errback} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const corsOptions = {
    origin: true,
    credentials: true
  };
  

const server = () => {
    const app = express();
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
        res.status(400).json({
          type: 'error',
          message: error.toString() || 'unknown error'
        });
      });

      return app;
}

export default server;