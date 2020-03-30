import TStages from "../models/types/TStages";
import TStageKeys from "../models/types/TStageKeys";
import { BehaviorSubject} from 'rxjs';

class Stage{
    private currentStage: BehaviorSubject<string>
    constructor(stages: TStages) {
        this.currentStage = new BehaviorSubject(stages.AWAITING_FOR_PLAYERS);
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
    AWAITING_FOR_GAME: 'AWAITING_FOR_GAME',
    GAME: 'GAME'
}

const stage = new Stage(stages);

export default stage;