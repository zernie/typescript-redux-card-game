import _ from "lodash/fp";
import { Abilities } from "./Abilities";
import { CardType, Controller, Race, Zone } from "./enums";
import { Playable } from "./Playable";
import { newId } from "./utils";

export interface Minion extends Playable {
  attack: number;
  maxHealth: number;
  readonly race: Race;
  readonly type: CardType.Minion;
}

export interface CraftMinionProps {
  attack: number;
  cardID: string;
  maxHealth: number;
  name: string;
  owner: Controller;
  cost: number;
  zone: Zone;

  abilities?: Abilities;
  attacksPerformed?: number;
  exhausted?: boolean;
  health?: number;
  race?: Race;
  text?: string;
}

export const craftMinion = (props: CraftMinionProps): Minion =>
  ({
    abilities: [],
    attacksPerformed: 0,
    destroyed: false,
    exhausted: true,
    health: props.maxHealth,
    race: Race.Blank,
    text: null,
    ...props,
    id: newId(),
    type: CardType.Minion
  } as Minion);
