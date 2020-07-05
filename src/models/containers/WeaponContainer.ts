import _ from "lodash/fp";
import { craftWeapon, CraftWeaponProps, Weapon } from "../Weapon";
import { Container } from "../Container";
import { getEntity, makeEntityContainer } from "./EntityContainer";

export type WeaponContainer = Container<Weapon>;

export const craftWeapons = (...props: CraftWeaponProps[]) =>
  _.map(craftWeapon, props) as Weapon[];

export const craftWeaponContainer = (...props: CraftWeaponProps[]) =>
  makeEntityContainer(craftWeapons(...props)) as WeaponContainer;

// FIXME
// export const getWeapon = (...args: Parameters<typeof getEntity>) => getEntity<Weapon>(...args);
export const getWeapon = getEntity;
// export const getWeapon = <T extends number|null>(id: T, game: Game): (T extends null ? null : Weapon) =>
//     (id ? game.play[id] : null);
// export const getWeapon = _.curry(
//   (id: number, game: Game) => game.play[id] as Weapon
// );
