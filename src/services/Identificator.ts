import { v4 as uuidv4 } from 'uuid';

class Identyfikator {
  generate = (): string => {
    return uuidv4();
  };
}

const identyfikator = new Identyfikator();

export default identyfikator;
