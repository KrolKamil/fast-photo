import IMessage from '../../models/interfaces/IMessage';
import ISuperHandler from '../../models/interfaces/ISuperHandler';

export default class Auth implements ISuperHandler  {
  type: string;
  constructor(){
    this.type = 'auth';
  }
  handle = async (message: IMessage) => {
    
  }
}