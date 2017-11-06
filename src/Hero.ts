import { Character } from './Character';
import { Mechanics } from './Mechanics';
import { newId } from './utils';

export type Hero = Readonly<Character & {
  mana: number;
  maximumHealth: number;
  maximumMana: number;
  armor: number;
}>;

export enum PlayerKind {
  Player = 'PLAYER',
  Opponent = 'OPPONENT',
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
  maximumHealth?: number,
  maximumMana?: number,
}): Hero =>
  ({
    armor: 0,
    attack: 0,
    attacksPerformed: 0,
    health: 30,
    id: newId(),
    mana: 0,
    mechanics: [],
    maximumHealth: 30,
    maximumMana: 0,
    ...props,
  });

export const canSpendMana = (hero: Hero, mana: number) => hero.maximumMana - mana >= 0;
