import { Controller, Zone } from './enums';

export type BasicCard = Readonly<{
  cost: number;
  cardID: string;
  id: number;
  name: string;
  owner: Controller;
  text?: string;
  zone: Zone;
}>;
