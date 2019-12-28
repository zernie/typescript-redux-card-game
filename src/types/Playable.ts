import { Abilities } from "./Abilities";
import { BasicCard } from "./BasicCard";

export interface Playable extends BasicCard {
  abilities: Abilities;
  attacksPerformed: number;
  attack: number;
  destroyed: boolean;
  exhausted: boolean;
  health: number;
  maxHealth: number;
}
