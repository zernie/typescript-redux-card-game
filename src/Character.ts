import * as R from 'ramda';
import { Hero } from './Hero';
import { Ability } from './Abilities';
import { Minion } from './Minion';
import { Card } from './Card';
import { Game } from './Game';
import { Container } from './Container';
import { CardType } from './enums';

export type Character = Hero | Minion;
export type CharacterContainer = Container<Character>;

export const getCharacter = (id: number, game: Game): Character =>
  getCharacters(game)[id];

export const getCharacters = (game: Game): CharacterContainer =>
  R.filter(
    R.propSatisfies(R.contains(R.__, [CardType.Minion, CardType.Hero]), 'type'),
    game.entities
  );

export const hasAbility = R.curry(
  (ability: Ability, entity: Character | Card): boolean =>
    R.contains(ability, entity.abilities)
);
export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  !(
    character.attacksPerformed < 1 ||
    (hasWindfury(character) && character.attacksPerformed < 2)
  );

export const hasTaunt = hasAbility(Ability.Taunt);
export const hasCharge = hasAbility(Ability.Charge);
export const hasWindfury = hasAbility(Ability.Windfury);
