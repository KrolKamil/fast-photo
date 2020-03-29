import IMessage from '../../models/interfaces/IMessage';
import ISuperHandler from '../../models/interfaces/ISuperHandler';
import THandlers from '../../models/types/THandlers';

export default class Auth implements ISuperHandler  {
  type: string;
  handlers: THandlers
  constructor(){
    this.type = 'auth';
    this.handlers = new Map();
    this.loadHandlers();
  }

  loadHandlers = () => {

  }

  handle = async (message: IMessage) => {
    
  }
}