import players from '../services/Players';
import stage from '../services/Stage';
import amazonWebServices from '../services/AWS';

export const parseJsonAsync = (jsonString: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(jsonString));
    });
  });
};

export const base64ToBuffer = (data: any) => Buffer.from(data, 'base64');

export const resetEverything = () => {
  players.reset();
  stage.reset();
  amazonWebServices.reset();
};
