import { Abilities } from "./Abilities";
import { BasicCard } from "./BasicCard";
import { CardClass } from "./enums";

/**
 * Interface for an entity which can be played from Zone.Hand, in other words: the entity can be 'played'.
 */
export interface Playable extends BasicCard {
  abilities: Abilities;
  attacksPerformed: number;
  attack: number;
  cardClass: CardClass;
  destroyed: boolean;
  exhausted: boolean;
  health: number;
  maxHealth: number;
}
