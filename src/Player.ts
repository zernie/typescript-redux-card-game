import Card from "./Card";

interface Player {
  name: string;
  hand: Card[];
  deck: Card[];
  mana: number;
  totalMana: number;
  health: number;
}

export default Player;
