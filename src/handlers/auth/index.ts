import IMessage from '../../models/interfaces/IMessage';
import IHandler from '../../models/interfaces/IHandler';

export default class Auth implements IHandler  {
  type: string;
  constructor(){
    this.type = 'auth';
  }
  handle = (message: IMessage) => {
    
  }
}