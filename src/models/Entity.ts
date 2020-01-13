import _ from "lodash/fp";
import { EntityContainer } from "./containers";
import { CardType } from "./enums";
import { Character } from "./Character";
import { Weapon } from "./Weapon";
import { Player } from "./Player";
import { HeroPower } from "./HeroPower";
import { Hero } from "./Hero";
import { Minion } from "./Minion";
import { Card } from "./Card";

export type Entity = Player | Card;

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
