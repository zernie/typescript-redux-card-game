import { Controller, Zone } from "./enums";

export interface BasicCard {
  cost: number;
  cardID: string;
  id: number;
  name: string;
  owner: Controller;
  text?: string;
  zone: Zone;
}
