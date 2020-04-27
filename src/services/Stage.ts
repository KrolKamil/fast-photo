import TStages from '../models/types/TStages';
import { BehaviorSubject, Observable } from 'rxjs';

class Stage {
  private currentStage: BehaviorSubject<string>;
  private stages: TStages;
  constructor(initStages: TStages) {
    this.stages = initStages;
    this.currentStage = new BehaviorSubject(this.stages.AWAITING_FOR_PLAYERS);
  }

  reset = (): void => this.currentStage.next(this.stages.AWAITING_FOR_PLAYERS);
  observe = (): Observable<string> => this.currentStage.asObservable();
  change = (stage: string): void => this.currentStage.next(stage);
  current = (): string => this.currentStage.getValue();
}

export const stages: TStages = {
  AWAITING_FOR_PLAYERS: 'AWAITING_FOR_PLAYERS',
  GAME: 'GAME',
  GAME_OVER: 'GAME_OVER'
};

const stage = new Stage(stages);

export default stage;
