import _ from "lodash/fp";
import { Character } from "./Character";
import { Container } from "./Container";
import { EntityContainer } from "./Entity";
import { Minion } from "./Minion";

export type MinionContainer = Container<Minion>;

export const entitiesFrom = (array: Array<Character>): EntityContainer =>
  _.indexBy<Character>(_.prop("id"), array) as EntityContainer;
