import TStages from "../models/types/TStages";
import TStageKeys from "../models/types/TStageKeys";
import { BehaviorSubject} from 'rxjs';

class Stage{
    stages: TStages;
    currentStage: BehaviorSubject<string>
    constructor(stages: TStages) {
        this.stages = stages;
        this.currentStage = new BehaviorSubject(stages.AWAITING_FOR_PLAYERS);
    }

    change = (stage: TStageKeys) => {
        this.currentStage.next(stage);
    }

    current = (): string => {
        return this.currentStage.value;
    }
}

export const stages: TStages = {
    AWAITING_FOR_PLAYERS: 'AWAITING_FOR_PLAYERS',
    AWAITING_FOR_GAME: 'AWAITING_FOR_GAME',
    GAME: 'GAME'
}

const stage = new Stage(stages);

export default stage;