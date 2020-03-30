import uuid from 'uuid';

class Identyfikator{
    generate = (): string => {
        return uuid.v4();
    }
}

const identyfikator = new Identyfikator();

export default identyfikator;