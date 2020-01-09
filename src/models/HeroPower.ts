import { Playable } from "./Playable";
import { CardType } from "./enums";

export interface HeroPower extends Playable {
  name: string;
  type: CardType.HeroPower;
}
