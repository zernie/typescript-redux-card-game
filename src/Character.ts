import * as R from 'ramda';
import { PlayerKind } from './Player';

export interface Character {
  attacksPerformed: number;
  damage: number;
  health: number;
  name: string;
}

const selectCharacters = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerCharacters = selectCharacters(PlayerKind.Player);
export const opponentCharacters = selectCharacters(PlayerKind.Opponent);
