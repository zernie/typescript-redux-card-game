import _ from "lodash/fp";
import { Abilities } from "./Abilities";
import { MinionContainer } from "./Board";
import { hasTaunt } from "./Card";
import { Character } from "./Character";
import { EntityContainer } from "./Entity";
import { Ability, CardType, Controller, Zone } from "./enums";
import { Playable } from "./Playable";
import { newId } from "./utils";

export interface Minion extends Playable {
  attack: number;
  type: CardType.Minion;
}

export interface CraftMinionProps {
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
}

const selectMinions = (controller: Controller) => (
  container: MinionContainer
) => _.pickBy(_.propEq("owner", controller), container) as MinionContainer;

export const playerMinions = selectMinions(Controller.Player);
export const opponentMinions = selectMinions(Controller.Opponent);

export const craftMinion = (props: CraftMinionProps): Minion =>
  ({
    abilities: [],
    attacksPerformed: 0,
    destroyed: false,
    exhausted: !!props.abilities && !props.abilities.includes(Ability.Charge),
    health: props.maxHealth,
    ...props,
    id: newId(),
    type: CardType.Minion
  } as Minion);

// TODO: return container
export const craftMinions = (minionProps: CraftMinionProps[]): Minion[] =>
  _.map(craftMinion, minionProps) as Minion[];

export const getMinions = (entities: EntityContainer) =>
  _.pickBy(_.propEq("type", CardType.Minion), entities) as MinionContainer;

export const ownerMinions = _.curry(
  (player: Controller, minions: MinionContainer) =>
    (_.pickBy(_.propEq("owner", player), minions)) as MinionContainer
);

export const anyTaunts = (minions: MinionContainer) =>
  _.any(hasTaunt, _.values(minions));

export const isValidTarget = (
  character: Character,
  characters: MinionContainer
) => (anyTaunts(characters) ? hasTaunt(character) : true);
