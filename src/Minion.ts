import * as R from 'ramda';
import { Abilities } from './Abilities';
import { Character, hasCharge, hasTaunt } from './Character';
import { newId } from './utils';
import { Playable } from './Playable';
import { Ability, CardType, Controller } from './enums';
import { MinionCard } from './Card';
import { EntityContainer } from './Entity';
import { MinionContainer } from './Board';

export type Minion = Readonly<Playable & { type: CardType.Minion }>;
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
}>;

const selectMinions = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerMinions = selectMinions(Controller.Player);
export const opponentMinions = selectMinions(Controller.Opponent);

export const craftMinion = (props: CraftMinionProps): Minion => ({
  abilities: [],
  attacksPerformed: 0,
  exhausted: true,
  destroyed: false,
  health: props.maxHealth,
  ...props,
  id: newId(),
  type: CardType.Minion,
});
export const minionFromCard = R.pipe<
  MinionCard,
  CraftMinionProps,
  Minion,
  Minion
>(
  R.pick<MinionCard, keyof MinionCard>([
    'abilities',
    'attack',
    'cardID',
    'maxHealth',
    'name',
    'owner',
  ]),
  craftMinion,
  R.when<Minion, Minion>(
    hasCharge,
    R.assoc<keyof CraftMinionProps, boolean>('exhausted', false)
  )
);

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

export const isValidTarget = (character: Character, characters: MinionContainer) =>
  anyTaunts(characters) ? hasTaunt(character) : true;
