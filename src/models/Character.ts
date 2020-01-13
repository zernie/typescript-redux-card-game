import _ from "lodash/fp";
import { hasWindfury } from "./Card";
import { Hero } from "./Hero";
import { Minion } from "./Minion";
import { isHero } from "./Entity";
import { Playable } from "./Playable";

export interface ICharacter extends Playable {
  attacking: boolean;
  defending: boolean;
  armor: number;
  maxHealth: number;
}

export type Character = Hero | Minion;

export const isExhausted = (char: Character) => char.exhausted;

export const canAttack = (character: Character): boolean => {
  if (isHero(character) && !character.weaponID) return false;

  return character.attack > 0 && !character.exhausted;
};

export const shouldExhaust = (character: Character): boolean => {
  const maxAttacks = hasWindfury(character) ? 2 : 1;

  return character.attacksPerformed >= maxAttacks;
};

export const shouldBeDestroyed = (char: Character) => char.health <= 0;
