import { Abilities } from './Abilities';
import { Controller } from './enums';

export type Playable = Readonly<{
  abilities: Abilities;
  attacksPerformed: number;
  attack: number;
  cardID: string;
  destroyed: boolean;
  exhausted: boolean;
  health: number;
  id: number;
  maxHealth: number;
  name: string;
  owner: Controller;
}>;
