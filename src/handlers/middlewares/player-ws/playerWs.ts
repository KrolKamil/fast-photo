import IMessage from "../../../models/interfaces/IMessage";
import players from "../../../services/players/Players";

const playerWs = async (message: IMessage): Promise<void> => {
  if (message.payload && message.payload.id) {
    try {
      const player = players.get(message.payload.id);
      player.ws = message.ws;
      players.edit(player);
    } catch (e) { }
  }
}

export default playerWs;