import stage from '../services/Stage';
import players from '../services/players/Players';
import playersWords from '../services/players/players-words/PlayersWords';
import amazonWebServices from '../services/AWS';
import playersAdmin from '../services/players/players-admin/PlayersAdmin';

export const parseJsonAsync = (jsonString: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(jsonString));
    });
  });
};

export const base64ToBuffer = (data: any) => Buffer.from(data, 'base64');

export const resetSocket = (): void => {
  stage.reset();
  playersAdmin.reset();
  players.reset();
  playersWords.reset();
};

export const resetEverything = (): void => {
  resetSocket();
  amazonWebServices.reset();
};
