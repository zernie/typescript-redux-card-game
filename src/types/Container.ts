// export type Container<T> = Record<number | string, T>;
import { Character } from "./Character";
import { Minion } from "./Minion";
import { Weapon } from "./Weapon";

export type Container<T> = Record<string, T>;
export type CharacterContainer = Container<Character>;
export type MinionContainer = Container<Minion>;
export type WeaponContainer = Container<Weapon>;
