import _ from "lodash/fp";
import { Character } from "./Character";
import { Weapon } from "./Weapon";
import { Container } from "./Container";
import { Player } from "./Player";
import { HeroPower } from "./HeroPower";
import { Hero } from "./Hero";
import { CardType } from "./enums";
import { Minion } from "./Minion";

export type Entity = Player | Character | Weapon | HeroPower;
export type EntityContainer = Container<Entity>;
export type EntityPayload<T extends Record<string, any> = {}> = T & {
  id: number;
};

export const entitiesFrom = (array: Entity[]): EntityContainer =>
  _.indexBy<Entity>(_.prop("id"), array) as EntityContainer;

export const isHero = (entity: Entity): entity is Hero =>
  entity.type === CardType.Hero;

export const isMinion = (entity: Entity): entity is Minion =>
  entity.type === CardType.Minion;

export const isCharacter = (entity: Entity): entity is Character =>
  isMinion(entity) || isHero(entity);

export const isWeapon = (entity: Entity): entity is Weapon =>
  entity.type === CardType.Weapon;

export const isPlayer = (entity: Entity): entity is Player =>
  entity.type === CardType.Player;

export const isHeroPower = (entity: Entity): entity is HeroPower =>
  entity.type === CardType.HeroPower;
