import players from "../../services/players/Players";
import stage, { stages } from "../../services/Stage";
import TPlayers from "../../models/types/TPlayers";
import playersActive from "../../services/players/players-active/PlayersActive";
import playersAdmin from "../../services/players/players-admin/PlayersAdmin";

export default class Space {
  constructor() {
    players.observe().subscribe(this.handleSpace)
  }

  deleteInactivePlayers = (inactivePlayers: string[]) => {
    inactivePlayers.forEach(inactivePlayer => {
      players.delete(inactivePlayer);
      if (playersAdmin.isAdmin(inactivePlayer)) {
        playersAdmin.reset();
      }
    });
    players.poke();
  }

  handleSpace = (currentPlayers: TPlayers) => {
    if (stage.current() === stages.AWAITING_FOR_PLAYERS) {
      const playersToDelete: string[] = [];
      currentPlayers.forEach((currentPlayer) => {
        if (playersActive.isActive(currentPlayer.id) === false) {
          playersToDelete.push(currentPlayer.id);
        }
      });
      if (playersToDelete.length > 0) {
        this.deleteInactivePlayers(playersToDelete);
      }
    }
  }
}