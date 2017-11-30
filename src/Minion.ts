import * as R from 'ramda';
import { Ability } from './Abilities';
import { anyTaunts, Character, hasAbility, hasTaunt } from './Character';
import { newId } from './utils';
import { Playable } from './Playable';
import { CardType, PlayerKind } from './enums';
import { MinionCard } from './Card';
import { EntityContainer } from './Entity';
import { MinionContainer } from './Board';

export type Minion = Readonly<Playable & { type: CardType.Minion }>;
export type CraftMinionProps = Readonly<{
  abilities?: Array<Ability>;
  attack: number;
  attacksPerformed?: number;
  cardID: string;
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
    hasAbility(Ability.Charge),
    R.assoc<keyof CraftMinionProps, boolean>('exhausted', false)
  )
);

export const getMinions = (entities: EntityContainer): MinionContainer =>
  R.pickBy(R.propEq('type', CardType.Minion), entities);

export const ownerMinions = R.curry(
  (player: PlayerKind, minions: MinionContainer): MinionContainer =>
    R.filter(R.propEq('owner', player), minions)
);

export const isValidTarget = (character: Character, characters: MinionContainer) =>
  anyTaunts(characters) ? hasTaunt(character) : true;
