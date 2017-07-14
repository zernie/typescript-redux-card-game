import Card from './Card';
import Minion from './Minion';

type Player = Readonly<
  {
    board: Minion[];
    deck: Card[];
    hand: Card[];
    health: number;
    mana: number;
    name: string;
    totalMana: number;
  }
>;

export enum ActivePlayer {
  Player,
  Opponent,
}

export const other = (player: ActivePlayer): ActivePlayer => {
  if (player === ActivePlayer.Player) {
    return ActivePlayer.Opponent;
  }
  return ActivePlayer.Opponent;
};

export default Player;
