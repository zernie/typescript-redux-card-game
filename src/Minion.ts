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

const selectMinions = (controller: Controller) => (container: MinionContainer) =>
  _.filter(_.propEq("owner", controller), container);

export const playerMinions = selectMinions(Controller.Player);
export const opponentMinions = selectMinions(Controller.Opponent);

export const craftMinion = (props: CraftMinionProps): Minion => ({
  abilities: [],
  attacksPerformed: 0,
  destroyed: false,
  exhausted: !!props.abilities && !props.abilities.includes(Ability.Charge),
  health: props.maxHealth,
  ...props,
  id: newId(),
  type: CardType.Minion
});

export const getMinions = (entities: EntityContainer) =>
  _.pickBy(_.propEq("type", CardType.Minion), entities) as MinionContainer;

export const ownerMinions = _.curry(
  (player: Controller, minions: MinionContainer) =>
    _.filter(_.propEq("owner", player), minions) as MinionContainer
);

export const anyTaunts = (minions: MinionContainer) =>
  _.any(
    minion => _.contains(Ability.Taunt, minion.abilities),
    _.values(minions)
  );

export const isValidTarget = (
  character: Character,
  characters: MinionContainer
) => (anyTaunts(characters) ? hasTaunt(character) : true);
