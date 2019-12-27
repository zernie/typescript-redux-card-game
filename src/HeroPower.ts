import { Playable } from "./Playable";
import { CardType } from "./enums";
import { Abilities } from "./Abilities";

export interface HeroPower extends Playable {
  abilities: Abilities;
  name: string;
  type: CardType.HeroPower;
}
