import Card from "./Card";
import Minion from "./Minion";

interface Player {
  name: string;
  hand: Card[];
  deck: Card[];
  mana: number;
  minions: Minion[];
  totalMana: number;
  health: number;
}

export default Player;
