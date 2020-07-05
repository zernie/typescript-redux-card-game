import _ from "lodash/fp";
import { Container } from "../Container";
import { Entity } from "../Entity";

export type EntityContainer<T = Entity> = Container<T>;

export const makeEntityContainer = <T extends Entity>(entities: T[]) =>
  _.indexBy<Entity>(_.prop("id"), entities) as EntityContainer<T>;

// FIXME
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
// export const getEntitiesById = <T extends EntityContainer = EntityContainer>(container: T, ids: number[]) =>
//   _.pick<T>(ids, container) as T;
