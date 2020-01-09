// export type Container<T> = Record<number | string, T>;
import { Character } from "./Character";
import { Minion } from "./Minion";
import { Weapon } from "./Weapon";
import { Card } from "./Card";
import { Player } from "./Player";

export type Container<T> = Record<string, T>;
export type CharacterContainer = Container<Character>;
export type MinionContainer = Container<Minion>;
export type WeaponContainer = Container<Weapon>;
export type CardContainer = Container<Card>;
export type PlayerContainer = Container<Player>;
