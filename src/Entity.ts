import { Character } from './Character';
import { Weapon } from './Weapon';
import { Container } from './Container';
import { Player } from './Player';
import { HeroPower } from './HeroPower';

export type Entity = Player | Character | Weapon | HeroPower;
export type EntityContainer = Container<Entity>;
export type EntityPayload<T extends Record<string, any> = {}> = T & {
  id: number;
};
