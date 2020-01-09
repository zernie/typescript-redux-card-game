import _ from "lodash/fp";
import { hasWindfury } from "./Card";
import { Hero } from "./Hero";
import { Minion } from "./Minion";
import { EntityContainer, isCharacter } from "./Entity";
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

export const getCharactersById = (container: EntityContainer, ids: number[]) =>
  _.pick<EntityContainer>(ids, container) as CharacterContainer;

export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  hasWindfury(character)
    ? character.attacksPerformed >= 2
    : character.attacksPerformed >= 1;

export const charsFromContainer = (entities: EntityContainer) =>
  _.pickBy(isCharacter, entities) as CharacterContainer;
