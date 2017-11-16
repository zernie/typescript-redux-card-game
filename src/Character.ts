import * as R from 'ramda';
import { Hero } from './Hero';
import { Ability } from './Abilities';
import { Minion } from './Minion';
import { getEntity } from './EntityContainer';
import { Game } from './Game';

export enum CharacterType {
  Minion = 'MINION',
  Hero = 'HERO',
}

export type Character = Hero | Minion;

// const selectCharacters = R.useWith(R.filter, [R.propEq('owner'), R.identity]);
//
// export const playerCharacters = selectCharacters(PlayerKind.Player);
// export const opponentCharacters = selectCharacters(PlayerKind.Opponent);

export const getCharacter = (id: number, game: Game) =>
  getEntity<Character>(id, game.board);

export const hasAbility = R.curry((ability: Ability, character: Character) =>
  R.contains(ability, character.abilities)
);
export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  !(
    character.attacksPerformed < 1 ||
    (hasAbility(Ability.Windfury, character) && character.attacksPerformed < 2)
  );
