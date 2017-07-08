import Card from "./Card";

type Player = {
  name: string;
  cards: Card[];
  deck: Card[];
  mana: number;
  totalMana: number;
  health: number;
};

export default Player;
