import * as _ from "lodash/fp";
import { hasWindfury } from "./Card";
import { Container } from "./Container";
import { CardType } from "./enums";
import { Game } from "./Game";
import { Hero } from "./Hero";
import { Minion } from "./Minion";
// import { EntityContainer } from './Entity';

export type Character = Hero | Minion;
export type CharacterContainer = Container<Character>;

export const getCharacter = (id: number, game: Game): Character =>
  getCharacters(game)[id];
export const getCharacters = (game: Game): CharacterContainer =>
  _.filter(
    _.propEq("type", _.contains([CardType.Minion, CardType.Hero])),
    game.entities
  ) as CharacterContainer;

export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  hasWindfury(character)
    ? character.attacksPerformed >= 2
    : character.attacksPerformed >= 1;
