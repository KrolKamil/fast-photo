import { createServer } from 'http';
import server from './server';

const runningPort = process.env.PORT || 3000;

const app = () => {
    const app = createServer(server());

    app.listen(runningPort, () => {
         console.log(`Server staretd at port: ${runningPort}`);
        });
}

app();