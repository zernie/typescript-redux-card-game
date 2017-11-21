import * as R from 'ramda';
import { Hero } from './Hero';
import { Ability } from './Abilities';
import { Minion } from './Minion';
import { getEntity } from './EntityContainer';
import { Game } from './Game';
import { Card } from './Card';

export type Character = Hero | Minion;

// const selectCharacters = R.useWith(R.filter, [R.propEq('owner'), R.identity]);
//
// export const playerCharacters = selectCharacters(PlayerKind.Player);
// export const opponentCharacters = selectCharacters(PlayerKind.Opponent);

export const getCharacter = (id: number, game: Game) =>
  getEntity<Character>(id, game.board);

export const hasAbility = R.curry((ability: Ability, entity: Character | Card): boolean =>
  R.contains(ability, entity.abilities)
);
export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  !(
    character.attacksPerformed < 1 ||
    (hasAbility(Ability.Windfury, character) && character.attacksPerformed < 2)
  );
