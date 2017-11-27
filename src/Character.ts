import * as R from 'ramda';
import { Hero } from './Hero';
import { Ability } from './Abilities';
import { Minion } from './Minion';
import { Card } from './Card';
import { Game, getCharacters } from './Game';
import { Container } from './Container';

export type Character = Hero | Minion;
export type CharacterContainer = Container<Character>;

export const getCharacter = (id: number, game: Game): Character =>
  getCharacters(game)[id];

export const hasAbility = R.curry(
  (ability: Ability, entity: Character | Card): boolean =>
    R.contains(ability, entity.abilities)
);
export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  !(
    character.attacksPerformed < 1 ||
    (hasAbility(Ability.Windfury, character) && character.attacksPerformed < 2)
  );
