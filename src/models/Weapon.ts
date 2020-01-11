import _ from "lodash/fp";
import { Abilities } from "./Abilities";
import { CardClass, CardType, Controller, Zone } from "./enums";
import { newId } from "./utils";
import { entitiesFrom } from "./Entity";
import { getEntity, WeaponContainer } from "./Container";
import { Playable } from "./Playable";

export interface Weapon extends Playable {
  attack: number;
  readonly name: string;
  heroId: number;
  readonly type: CardType.Weapon;
}

interface CraftWeaponProps {
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

// ### HELPERS

export const craftWeapon = (props: CraftWeaponProps): Weapon =>
  ({
    abilities: [],
    cardClass: CardClass.Neutral,
    text: null,
    ...props,
    id: newId(),
    type: CardType.Weapon
  } as Weapon);

export const craftWeapons = (...props: CraftWeaponProps[]): WeaponContainer =>
  entitiesFrom(_.map(craftWeapon, props) as Weapon[]) as WeaponContainer;

// FIXME
// export const getWeapon = (...args: Parameters<typeof getEntity>) => getEntity<Weapon>(...args);
export const getWeapon = getEntity;
// export const getWeapon = <T extends number|null>(id: T, game: Game): (T extends null ? null : Weapon) =>
//     (id ? game.play[id] : null);
// export const getWeapon = _.curry(
//   (id: number, game: Game) => game.play[id] as Weapon
// );
