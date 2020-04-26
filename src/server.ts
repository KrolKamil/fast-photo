import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Errback
} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { resetEverything } from './utils';
import IAWSConfig from './models/interfaces/IAWSConfig';
import amazonWebServices from './services/AWS';

const corsOptions = {
  origin: true,
  credentials: true
};

const server = (): Express => {
  const app = express();
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
      type: 'error',
      message: error.toString() || 'unknown error'
    });
  });

  app.get('/reset', (req, res) => {
    resetEverything();
    const timeNow = new Date();
    res.send(`Server has been restarted at: ${timeNow}`);
  });

  app.get('/', (req, res) => {
    res.send(`I'm alive!`);
  });

  app.post('/load', (req, res) => {
    if (
      !req.body.aws_access_key_id ||
      !req.body.aws_secret_access_key ||
      !req.body.aws_session_token
    ) {
      return res.json({
        error:
          'required: aws_access_key_id, aws_secret_access_key, aws_session_token'
      });
    }

    const config: IAWSConfig = {
      accessKeyId: req.body.aws_access_key_id,
      secretAccessKey: req.body.aws_secret_access_key,
      sessionToken: req.body.aws_session_token
    };

    amazonWebServices.loadConfig(config);

    return res.json({
      updated: true
    });
  });

  return app;
};

export default server;
