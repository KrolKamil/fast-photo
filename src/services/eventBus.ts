import { Subject } from 'rxjs';
import IResponse from '../models/interfaces/IResponse';

const eventBus = new Subject<Array<IResponse>>();
eventBus.subscribe((responses: Array<IResponse>) => {
  responses.forEach((response) => {
    response.ws.send(JSON.stringify(response.message));
  });
});

export default eventBus;
