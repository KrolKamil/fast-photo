import { Subject } from 'rxjs';
import IHandler from '../../models/interfaces/IHandler';
import IResponse from '../../models/interfaces/IResponse';
import stage from '../../services/Stage';
import IMessage from '../../models/interfaces/IMessage';
class StageCurrent implements IHandler {
  static type = 'stage_current';
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }

  handle = async (message: IMessage): Promise<void> => {
    const response: IResponse = {
      ws: message.ws,
      message: {
        type: 'stage_current',
        payload: {
          stage: stage.current()
        }
      }
    };
    this.eventBus.next([response]);
    return;
  };
}

export default StageCurrent;
