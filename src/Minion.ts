import * as R from 'ramda';
import { Ability } from './Abilities';
import { PlayerKind } from './Hero';
import { Character, hasAbility } from './Character';
import { newId } from './utils';

export type Minion = Character;

const selectMinions = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerMinions = selectMinions(PlayerKind.Player);
export const opponentMinions = selectMinions(PlayerKind.Opponent);
export const craftMinion = (props: {
  attack: number;
  health: number;
  name: string;
  owner: PlayerKind;
  abilities?: Array<Ability>;
  attacksPerformed?: number;
  exhausted?: boolean;
}): Minion => ({
  abilities: [],
  attacksPerformed: 0,
  exhausted: true,
  id: newId(),
  ...props,
});
export const fromCard = R.pipe(
  R.pick(['abilities', 'attack', 'health', 'name', 'owner']),
  R.when(hasAbility(Ability.Charge), R.assoc('exhausted', false)),
  craftMinion,
);
