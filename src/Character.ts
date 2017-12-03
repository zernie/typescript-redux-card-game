import * as R from 'ramda';
import { Hero } from './Hero';
import { Minion } from './Minion';
import { Game } from './Game';
import { Container } from './Container';
import { CardType } from './enums';
import { hasWindfury } from './Card';

export type Character = Hero | Minion;
export type CharacterContainer = Container<Character>;

export const getCharacter = (id: number, game: Game): Character =>
  getCharacters(game)[id];
export const getCharacters = (game: Game): CharacterContainer =>
  R.filter(
    R.propSatisfies(R.contains(R.__, [CardType.Minion, CardType.Hero]), 'type'),
    game.entities
  );

export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  hasWindfury(character)
    ? character.attacksPerformed >= 2
    : character.attacksPerformed >= 1;
