import * as R from 'ramda';
import { Hero, PlayerKind } from './Hero';
import { Ability } from './Abilities';
import { Minion } from './Minion';

export type Character = Hero | Minion;
export type Playable = Readonly<{
  abilities: Array<Ability>;
  attacksPerformed: number;
  attack: number;
  exhausted: boolean;
  health: number;
  id: number;
  maxHealth: number;
  name: string;
  owner: PlayerKind;
}>;

const selectCharacters = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerCharacters = selectCharacters(PlayerKind.Player);
export const opponentCharacters = selectCharacters(PlayerKind.Opponent);

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
