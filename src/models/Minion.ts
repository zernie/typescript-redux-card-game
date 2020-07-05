import _ from "lodash/fp";
import { Abilities } from "./Abilities";
import { CardType, Controller, Race, Zone } from "./enums";
import { newId } from "./utils";
import { ICharacter } from "./Character";

export interface Minion extends ICharacter {
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
  attacking?: boolean;
  defending?: boolean;
  exhausted?: boolean;
  health?: number;
  race?: Race;
  text?: string;
}

export const craftMinion = (props: CraftMinionProps): Minion =>
  ({
    abilities: [],
    attacksPerformed: 0,
    attacking: false,
    defending: false,
    destroyed: false,
    exhausted: false,
    health: props.maxHealth,
    race: Race.Blank,
    text: null,
    ...props,
    id: newId(),
    type: CardType.Minion
  } as Minion);
