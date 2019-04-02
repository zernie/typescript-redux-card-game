import { Abilities } from "./Abilities";
import { CardType, Controller, Zone } from "./enums";
import { BasicCard } from "./BasicCard";
import { newId } from "./utils";

export interface Weapon extends BasicCard {
  abilities: Abilities;
  attack: number;
  durability: number;
  name: string;
  owner: Controller;
  type: CardType.Weapon;
}

export type CraftWeaponProps = Readonly<{
  abilities?: Abilities;
  attack: number;
  cardID: string;
  cost: number;
  durability: number;
  name: string;
  owner: Controller;
  text?: string;
  zone: Zone;
}>;

export const craftWeapon = (props: CraftWeaponProps): Weapon => ({
  abilities: [],
  ...props,
  id: newId(),
  type: CardType.Weapon
});
