import _ from "lodash/fp";
import { Abilities } from "./Abilities";
import { hasTaunt } from "./Card";
import { Character } from "./Character";
import { EntityContainer, entitiesFrom } from "./Entity";
import { CardType, Controller, Race, Zone } from "./enums";
import { Playable } from "./Playable";
import { newId } from "./utils";
import { MinionContainer } from "./Container";

export interface Minion extends Playable {
  attack: number;
  race: Race;
  type: CardType.Minion;
}

interface CraftMinionProps {
  abilities?: Abilities;
  attack: number;
  attacksPerformed?: number;
  cardID: string;
  exhausted?: boolean;
  health?: number;
  maxHealth: number;
  name: string;
  owner: Controller;
  race: Race;
  cost: number;
  text?: string;
  zone: Zone;
}

const selectMinions = (controller: Controller) => (
  container: MinionContainer
) => _.pickBy(_.whereEq({ owner: controller }), container) as MinionContainer;

export const playerMinions = selectMinions(Controller.Player);
export const opponentMinions = selectMinions(Controller.Opponent);

export const craftMinion = (props: CraftMinionProps): Minion =>
  ({
    abilities: [],
    attacksPerformed: 0,
    destroyed: false,
    exhausted: true,
    health: props.maxHealth,
    race: Race.Blank,
    ...props,
    id: newId(),
    type: CardType.Minion
  } as Minion);

export const craftMinions = (props: CraftMinionProps[]) =>
  entitiesFrom(_.map(craftMinion, props) as Minion[]) as MinionContainer;

export const minionsFromContainer = (entities: EntityContainer) =>
  _.pickBy(_.whereEq({ type: CardType.Minion }), entities) as MinionContainer;

export const ownerMinions = _.curry(
  (player: Controller, minions: MinionContainer) =>
    _.pickBy(_.whereEq({ owner: player }), minions) as MinionContainer
);

export const anyTaunts = (minions: MinionContainer) => _.any(hasTaunt, minions);

export const isValidTarget = (
  character: Character,
  characters: MinionContainer
) => (anyTaunts(characters) ? hasTaunt(character) : true);
