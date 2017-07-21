type Player = Readonly<
  {
    health: number;
    mana: number;
    name: string;
    totalMana: number;
  }
>;

export enum PlayerKind {
  Player,
  Opponent,
}

export const other = (player: PlayerKind): PlayerKind =>
  player === PlayerKind.Player ? PlayerKind.Opponent : PlayerKind.Player;

export default Player;
