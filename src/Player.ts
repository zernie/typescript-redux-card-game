type Player = Readonly<
  {
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

export const other = (player: ActivePlayer): ActivePlayer =>
  player === ActivePlayer.Player ? ActivePlayer.Opponent : ActivePlayer.Player;

export default Player;
