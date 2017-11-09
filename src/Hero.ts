import { Character } from './Character';
import { Ability } from './Abilities';
import { newId } from './utils';
import * as R from 'ramda';

export type Hero = Readonly<Character & {
  armor: number;
  mana: number;
  maximumHealth: number;
  maximumMana: number;
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
  abilities?: Ability[],
  armor?: number;
  attack?: number,
  attacksPerformed?: number,
  exhausted?: boolean,
  health?: number,
  mana?: number,
  maximumHealth?: number,
  maximumMana?: number,
}): Hero =>
  ({
    abilities: [],
    armor: 0,
    attack: 0,
    attacksPerformed: 0,
    exhausted: false,
    health: 30,
    id: newId(),
    mana: 0,
    maximumHealth: 30,
    maximumMana: 0,
    ...props,
  });

export const canSpendMana = (hero: Hero, amount: number) => hero.mana - amount >= 0;
export const reduceArmor = (hero: Hero, damage: number): number =>
  R.max(0, hero.armor - damage);
export const reduceHealth = (hero: Hero, damage: number): number =>
  R.min(hero.health, hero.health + hero.armor - damage);
