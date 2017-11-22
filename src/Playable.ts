import { Ability } from './Abilities';
import { PlayerKind } from './enums';

export type Playable = Readonly<{
  abilities: Array<Ability>;
  attacksPerformed: number;
  attack: number;
  destroyed: boolean;
  exhausted: boolean;
  health: number;
  id: number;
  maxHealth: number;
  name: string;
  owner: PlayerKind;
  texture?: string;
}>;
