import { v4 as uuidv4 } from 'uuid';

class Identificator {
  generate = (): string => {
    return uuidv4();
  };
}

const identificator = new Identificator();

export default identificator;
