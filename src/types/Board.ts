import _ from "lodash/fp";
import { Container } from "./Container";
import { Entity, EntityContainer } from "./Entity";
import { Minion } from "./Minion";

export type MinionContainer = Container<Minion>;

// TODO:
export const entitiesFrom = (array: Entity[]): EntityContainer =>
  _.indexBy<Entity>(_.prop("id"), array) as EntityContainer;
