import Card from "./Card";

interface Player {
  name: string;
  cards: Card[];
  deck: Card[];
  mana: number;
  totalMana: number;
  health: number;
}

export default Player;
