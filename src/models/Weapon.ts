import _ from "lodash/fp";
import { Abilities } from "./Abilities";
import { CardClass, CardType, Controller, Zone } from "./enums";
import { newId } from "./utils";
import { Playable } from "./Playable";

export interface Weapon extends Playable {
  attack: number;
  readonly name: string;
  heroId: number;
  readonly type: CardType.Weapon;
}

export interface CraftWeaponProps {
  attack: number;
  cardID: string;
  cost: number;
  health: number;
  heroId: number;
  name: string;
  owner: Controller;
  zone: Zone;

  abilities?: Abilities;
  text?: string;
}

export const craftWeapon = (props: CraftWeaponProps): Weapon =>
  ({
    abilities: [],
    cardClass: CardClass.Neutral,
    text: null,
    ...props,
    id: newId(),
    type: CardType.Weapon
  } as Weapon);
