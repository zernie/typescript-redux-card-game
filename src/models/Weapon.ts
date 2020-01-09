import _ from "lodash/fp";
import { Abilities } from "./Abilities";
import { CardClass, CardType, Controller, Zone } from "./enums";
import { newId } from "./utils";
import { Game } from "./Game";
import { entitiesFrom } from "./Entity";
import { WeaponContainer } from "./Container";
import { Playable } from "./Playable";

export interface Weapon extends Playable {
  attack: number;
  durability: number;
  name: string;
  heroId: number;
  type: CardType.Weapon;
}

interface CraftWeaponProps {
  abilities?: Abilities;
  attack: number;
  cardID: string;
  cost: number;
  durability: number;
  heroId: number;
  name: string;
  owner: Controller;
  zone: Zone;

  text?: string;
}

export const craftWeapon = (props: CraftWeaponProps): Weapon =>
  ({
    abilities: [],
    cardClass: CardClass.Neutral,
    ...props,
    id: newId(),
    type: CardType.Weapon
  } as Weapon);

export const craftWeapons = (...props: CraftWeaponProps[]): WeaponContainer =>
  entitiesFrom(_.map(craftWeapon, props) as Weapon[]) as WeaponContainer;

export const getWeapon = (id: number | null, game: Game) =>
  (id ? game.play[id] : null) as Weapon | null;
// export const getWeapon = _.curry(
//   (id: number, game: Game) => game.play[id] as Weapon
// );
