import * as R from 'ramda';
import { Mechanics } from './Mechanics';
import { PlayerKind } from './Player';

export interface Minion {
  damage: number;
  health: number;
  id: number;
  mechanics: Mechanics[];
  name: string;
  owner: PlayerKind;
}

export const playerMinions = R.filter<Minion>(
  m => m.owner === PlayerKind.Player
);
export const opponentMinions = R.filter<Minion>(
  m => m.owner === PlayerKind.Opponent
);
