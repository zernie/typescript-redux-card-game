import * as R from 'ramda';
import { Ability } from './Abilities';
import { PlayerKind } from './Hero';
import { CharacterType, hasAbility } from './Character';
import { newId } from './utils';
import { Playable } from './Playable';

export type Minion = Readonly<Playable & { type: CharacterType.Minion }>;
export type CraftMinionProps = Readonly<{
  abilities?: Array<Ability>;
  attack: number;
  attacksPerformed?: number;
  exhausted?: boolean;
  health?: number;
  maxHealth: number;
  name: string;
  owner: PlayerKind;
}>;

const selectMinions = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerMinions = selectMinions(PlayerKind.Player);
export const opponentMinions = selectMinions(PlayerKind.Opponent);

export const craftMinion = (props: CraftMinionProps): Minion => ({
  abilities: [],
  attacksPerformed: 0,
  exhausted: true,
  destroyed: false,
  health: props.maxHealth,
  ...props,
  id: newId(),
  type: CharacterType.Minion,
});
export const fromCard = R.pipe(
  R.pick(['abilities', 'attack', 'health', 'maxHealth', 'name', 'owner']),
  R.when(hasAbility(Ability.Charge), R.assoc('exhausted', false)),
  craftMinion
);
