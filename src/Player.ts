import { Character } from './Character';

export type Player = Readonly<Character & {
  kind: PlayerKind;
  mana: number;
  totalMana: number;
}>;

export enum PlayerKind {
  Player,
  Opponent,
}

export const other = (player: PlayerKind): PlayerKind =>
  player === PlayerKind.Player ? PlayerKind.Opponent : PlayerKind.Player;
export const craftPlayer = (props: {
  kind: PlayerKind,
  name: string,
  damage?: number,
  health?: number,
  mana?: number,
  totalMana?: number,
  timesAttacked?: number,
}): Player =>
  ({
    damage: 0,
    health: 30,
    mana: 0,
    totalMana: 0,
    timesAttacked: 0,
    ...props,
  });
