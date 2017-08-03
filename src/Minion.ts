import * as R from 'ramda';
import { Mechanics } from './Mechanics';
import { PlayerKind } from './Player';

export interface Minion {
  damage: number;
  health: number;
  id: number;
  mechanics: Array<Mechanics>;
  name: string;
  owner: PlayerKind;
}

const selectMinions = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerMinions = selectMinions(PlayerKind.Player);
export const opponentMinions = selectMinions(PlayerKind.Opponent);
