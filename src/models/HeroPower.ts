import { Playable } from "./Playable";
import { CardType } from "./enums";

// TODO: implement
export interface HeroPower extends Playable {
  name: string;
  readonly type: CardType.HeroPower;
}
