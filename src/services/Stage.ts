import TStages from "../models/types/TStages";
import TStageKeys from "../models/types/TStageKeys";

class Stage{
    stages: any;
    currentStage: string
    constructor(stages: TStages) {
        this.stages = stages;
        this.currentStage = stages.AWAITING_FOR_PLAYERS
    }

    change = (stage: TStageKeys) => {
        this.currentStage = stage
    }

    current = () => {
        return this.currentStage;
    }
}

export const stages: TStages = {
    AWAITING_FOR_PLAYERS: 'AWAITING_FOR_PLAYERS'
}

const stage = new Stage(stages);

export default stage;