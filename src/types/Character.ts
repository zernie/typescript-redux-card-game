import _ from "lodash/fp";
import { hasWindfury } from "./Card";
import { CardType } from "./enums";
import { Game } from "./Game";
import { Hero } from "./Hero";
import { Minion } from "./Minion";
import { Entity, EntityContainer } from "./Entity";
import { CharacterContainer } from "./Container";

export type Character = Hero | Minion;

export const getCharacter = (id: number, game: Game): Character => {
  const entity = game.play[id];

  if (entity.type === CardType.Hero || entity.type === CardType.Minion)
    return entity;

  throw new Error(`Entity ${id} is not a character.`);
};

export const isHero = (entity: Entity): entity is Hero =>
  entity.type === CardType.Hero;
export const isMinion = (entity: Entity): entity is Minion =>
  entity.type === CardType.Minion;
export const isCharacter = (entity: Entity): entity is Character =>
  isMinion(entity) || isHero(entity);

// export const getCharacters = (game: Game): CharacterContainer =>
//   _.filter(
//     _.propEq("type", _.contains([CardType.Minion, CardType.Hero])),
//     game.play
//   ) as CharacterContainer;

export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  hasWindfury(character)
    ? character.attacksPerformed >= 2
    : character.attacksPerformed >= 1;

export const charsFromContainer = (entities: EntityContainer) =>
  _.pickBy(isCharacter, entities) as CharacterContainer;
