import { Character } from './Character';
import { Weapon } from './Weapon';
import { Container } from './Container';

export type Entity = Character | Weapon;
export type EntityContainer = Container<Entity>;
