import { CardType, Controller, Zone } from "./enums";

export interface BasicCard {
  readonly cardID: string;
  readonly id: number;
  readonly name: string;
  cost: number;
  owner: Controller;
  text: string | null;
  zone: Zone;
  type: CardType;
}
