import players from '../Players';

class PlayersActive {
  public maximumInactiveTime = 15000;

  public isActive = (id: string): boolean => {
    try {
      return new Date().getTime() - players.get(id).lastActiveTime <
        this.maximumInactiveTime;
    } catch (e) {
      return false;
    }
  }

  public updateActive = (id: string): void => {
    const player = players.get(id);
    player.lastActiveTime = new Date().getTime();
    players.edit(player);
  };

  public areAllPlayersInactive = (): boolean => {
    let allInactive = true;
    players.getAll().forEach((player) => {
      if (this.isActive(player.id) === true) {
        allInactive = false;
      }
    });
    return allInactive;
  };
}

const playersActive = new PlayersActive();

export default playersActive;
