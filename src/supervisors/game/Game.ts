import stage, { stages } from '../../services/Stage';

class Game {
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }
}

export default Game;
