import TStages from "../models/types/TStages";
import { BehaviorSubject} from 'rxjs';

class Stage{
    private currentStage: BehaviorSubject<string>
    private stages: TStages;
    constructor(initStages: TStages) {
        this.stages = initStages;
        this.currentStage = new BehaviorSubject(stages.AWAITING_FOR_PLAYERS);
    }

    reset = () => {
        this.currentStage.next(stages.AWAITING_FOR_PLAYERS);
    }

    observe = () => {
        return this.currentStage.asObservable();
    }

    change = (stage: string) => {
        this.currentStage.next(stage);
    }

    current = (): string => {
        return this.currentStage.getValue();
    }
}

export const stages: TStages = {
    AWAITING_FOR_PLAYERS: 'AWAITING_FOR_PLAYERS',
    GAME: 'GAME',
    GAME_OVER: 'GAME_OVER'
}

const stage = new Stage(stages);

export default stage;