import _ from "lodash/fp";
import { hasWindfury } from "./Card";
import { Hero } from "./Hero";
import { Minion } from "./Minion";
import { EntityContainer, isCharacter, isHero } from "./Entity";
import { CharacterContainer } from "./Container";

export type Character = Hero | Minion;

// export const getCharacter = (id: number, game: Game): Character => {
//   const entity = game.play[id];
//
//   if (entity.type === CardType.Hero || entity.type === CardType.Minion)
//     return entity;
//
//   throw new Error(`Entity ${id} is not a character.`);
// };

export const getCharacters = (entities: EntityContainer) =>
  _.pickBy(isCharacter, entities) as CharacterContainer;
export const getCharactersById = (container: EntityContainer, ids: number[]) =>
  _.pick<EntityContainer>(ids, container) as CharacterContainer;

export const isExhausted = (char: Character) => char.exhausted;

export const canAttack = (character: Character): boolean => {
  if (isHero(character) && !character.weaponID) return false;

  return character.attack > 0 && !character.exhausted;
};

export const shouldExhaust = (character: Character): boolean => {
  const maxAttacks = hasWindfury(character) ? 2 : 1;

  return character.attacksPerformed >= maxAttacks;
};
