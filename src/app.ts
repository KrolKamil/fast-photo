import { createServer } from 'http';
import server from './server';
import socket from './socket';

const runningPort = process.env.PORT || 3000;

const app = (): void => {
  const app = createServer(server());
  socket(app);

  app.listen(runningPort, () => {
    console.log(`Server staretd at port: ${runningPort}`);
  });
};

app();
