import { Character } from "./Character";
import { Container } from "./Container";
import { Weapon } from "./Weapon";

export type Entity = Character | Weapon;
export type EntityContainer = Container<Entity>;
