import { Character } from './Character';
import { Mechanics } from './Mechanics';

export type Player = Readonly<Character & {
  mana: number;
  maximumMana: number;
  armor: number;
}>;

export enum PlayerKind {
  Player,
  Opponent,
}

export const other = (player: PlayerKind): PlayerKind =>
  player === PlayerKind.Player ? PlayerKind.Opponent : PlayerKind.Player;
export const craftPlayer = (props: {
  owner: PlayerKind,
  name: string,
  armor?: number;
  attack?: number,
  attacksPerformed?: number,
  health?: number,
  mana?: number,
  mechanics?: Mechanics[],
  maximumMana?: number,
}): Player =>
  ({
    armor: 0,
    attack: 0,
    attacksPerformed: 0,
    health: 30,
    mana: 0,
    mechanics: [],
    maximumMana: 0,
    ...props,
  });
