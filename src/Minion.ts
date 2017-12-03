import * as R from 'ramda';
import { Abilities } from './Abilities';
import { Character } from './Character';
import { Playable } from './Playable';
import { Ability, CardType, Controller, Zone } from './enums';
import { EntityContainer } from './Entity';
import { MinionContainer } from './Board';
import { newId } from './utils';
import { hasTaunt } from './Card';

export interface Minion extends Playable {
  abilities: Abilities;
  attack: number;
  maxHealth: number;
  type: CardType.Minion;
}

export type CraftMinionProps = Readonly<{
  abilities?: Abilities;
  attack: number;
  attacksPerformed?: number;
  cardID: string;
  exhausted?: boolean;
  health?: number;
  maxHealth: number;
  name: string;
  owner: Controller;
  cost: number;
  text?: string;
  zone: Zone;
}>;

const selectMinions = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerMinions = selectMinions(Controller.Player);
export const opponentMinions = selectMinions(Controller.Opponent);

export const craftMinion = (props: CraftMinionProps): Minion => ({
  abilities: [],
  attacksPerformed: 0,
  // TODO: refactor
  exhausted: !!props.abilities && props.abilities.length > 0
    ? !R.contains(Ability.Charge, props.abilities)
    : true,
  destroyed: false,
  health: props.maxHealth,
  ...props,
  id: newId(),
  type: CardType.Minion,
});

export const getMinions = (entities: EntityContainer): MinionContainer =>
  R.pickBy(R.propEq('type', CardType.Minion), entities);

export const ownerMinions = R.curry(
  (player: Controller, minions: MinionContainer): MinionContainer =>
    R.filter(R.propEq('owner', player), minions)
);

export const anyTaunts = (minions: MinionContainer) =>
  R.any(
    R.propSatisfies(R.contains(Ability.Taunt), 'abilities'),
    R.values(minions)
  );

export const isValidTarget = (
  character: Character,
  characters: MinionContainer
) => (anyTaunts(characters) ? hasTaunt(character) : true);
