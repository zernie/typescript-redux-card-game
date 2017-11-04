import { Character } from './Character';
import { Mechanics } from './Mechanics';

export type Player = Readonly<Character & {
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
  attack?: number,
  owner: PlayerKind,
  name: string,
  health?: number,
  mana?: number,
  totalMana?: number,
  mechanics?: Mechanics[],
  attacksPerformed?: number,
}): Player =>
  ({
    attack: 0,
    health: 30,
    mana: 0,
    totalMana: 0,
    mechanics: [],
    attacksPerformed: 0,
    ...props,
  });
