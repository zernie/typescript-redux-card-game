import { Character } from "./Character";
import { Minion } from "./Minion";
import { Weapon } from "./Weapon";
import { Card } from "./Card";
import { Player } from "./Player";
import { Hero } from "./Hero";
import { Entity } from "./Entity";
import { HeroPower } from "./HeroPower";

export type Container<T> = Record<string, T>;
// export type Container<T> = Record<number | string, T>;

export type EntityContainer = Container<Entity>;
export type CharacterContainer = Container<Character>;
export type MinionContainer = Container<Minion>;
export type HeroContainer = Container<Hero>;
export type HeroPowerContainer = Container<HeroPower>;
export type WeaponContainer = Container<Weapon>;
export type CardContainer = Container<Card>;
export type PlayerContainer = Container<Player>;

// type IGetEntityOverload<T extends Entity = Entity> = {
//     (id: number, container: Container<T>): T;
//     (id: null, container: Container<T>): null;
// }
// export const getEntity:IGetEntityOverload = <T>(id: number|null, container: Container<T>) => !!id ? container[id] : null;

export function getEntity<T extends Entity>(
  container: Container<T>,
  id: number
): T;
export function getEntity<T extends Entity>(
  container: Container<T>,
  id: null
): null;
export function getEntity<T extends Entity>(
  container: Container<T>,
  id: number | null
): T | null;
export function getEntity<T extends Entity>(
  container: Container<T>,
  id: number | null
): T | null {
  if (!id) return null;
  return container[id];
}
// export function getEntity<T extends Entity, P extends number|null>(id: P, container:Container<T>): (P extends null ? null : T) {
//     if (!id) return null;
//     return container[id];
// }
