import TPlayers from "../types/TPlayers";
import { BehaviorSubject } from "rxjs";

export default interface IPlayers {
    players: BehaviorSubject<TPlayers>
}