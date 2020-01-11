import _ from "lodash/fp";
import { Container } from "../Container";
import { Character } from "../Character";
import { EntityContainer } from "./EntityContainer";
import { isCharacter } from "../Entity";

export type CharacterContainer = Container<Character>;

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
