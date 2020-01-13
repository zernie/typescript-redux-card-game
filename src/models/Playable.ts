import { Abilities } from "./Abilities";
import { BasicCard } from "./BasicCard";
import { CardClass } from "./enums";

/**
 * Entity which can be played from Zone.Hand (Hero, Minion, HeroPower, Spell, Weapon).
 */
export interface Playable extends BasicCard {
  abilities: Abilities;
  attacksPerformed: number;
  attack: number;
  readonly cardClass: CardClass;
  destroyed: boolean;
  exhausted: boolean;
  health: number;
}
