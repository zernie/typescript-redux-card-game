import { Character } from "./Character";
import { Weapon } from "./Weapon";
import { Container } from "./Container";
import { Player } from "./Player";

export type Entity = Character | Weapon | Player;
export type EntityContainer = Container<Entity>;
