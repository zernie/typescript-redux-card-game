type Card = {
  cost: number;
  name: string;
  health: number;
  damage: number;
};

type Player = {
  name: string;
  cards: Card[];
  mana: number;
  totalMana: number;
};

type Game = {
  currentPlayer: Player;
  firstPlayer: Player;
  secondPlayer: Player;
  turn: number;
};
