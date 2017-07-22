import { Mechanics } from './Mechanics';
import { PlayerKind } from './Player';

export type Minion = Readonly<
  {
    damage: number;
    health: number;
    id: number;
    mechanics: Mechanics[];
    name: string;
    owner: PlayerKind;
  }
>;
