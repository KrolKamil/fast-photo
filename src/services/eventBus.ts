import { Subject } from 'rxjs';
import IResponse from '../models/interfaces/IResponse';

const eventBus = new Subject<Array<IResponse>>();
eventBus.subscribe((responses: Array<IResponse>) => {
  responses.forEach((response) => {
    try {
      response.ws.send(JSON.stringify(response.message));
    } catch (e) {
      console.log('internal error');
      console.log(e.message);
    }
  });
});

export default eventBus;
