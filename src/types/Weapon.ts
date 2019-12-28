import _ from "lodash/fp";
import { Abilities } from "./Abilities";
import { CardType, Controller, Zone } from "./enums";
import { BasicCard } from "./BasicCard";
import { newId } from "./utils";
import { Game } from "./Game";
import { Container } from "./Container";
import { entitiesFrom, Entity } from "./Entity";
import { Minion } from "./Minion";
import { Character } from "./Character";

type WeaponContainer = Container<Weapon>;

export interface Weapon extends BasicCard {
  abilities: Abilities;
  attack: number;
  durability: number;
  name: string;
  owner: Controller;
  type: CardType.Weapon;
}

interface CraftWeaponProps {
  abilities?: Abilities;
  attack: number;
  cardID: string;
  cost: number;
  durability: number;
  name: string;
  owner: Controller;
  text?: string;
  zone: Zone;
}

export const craftWeapon = (props: CraftWeaponProps): Weapon =>
  ({
    abilities: [],
    ...props,
    id: newId(),
    type: CardType.Weapon
  } as Weapon);

export const craftWeapons = (props: CraftWeaponProps[]): WeaponContainer =>
  entitiesFrom(_.map(craftWeapon, props) as Weapon[]) as WeaponContainer;

export const getWeapon = _.curry(
  (id: number, game: Game) => game.play[id] as Weapon
);
export const isWeapon = (entity: Entity): entity is Weapon =>
  entity.type === CardType.Weapon;
