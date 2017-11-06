import * as R from 'ramda';
import { PlayerKind } from './Hero';
import { Mechanics } from './Mechanics';

export interface Character {
  attacksPerformed: number;
  attack: number;
  health: number;
  mechanics: Array<Mechanics>;
  name: string;
  owner: PlayerKind;
}

const selectCharacters = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerCharacters = selectCharacters(PlayerKind.Player);
export const opponentCharacters = selectCharacters(PlayerKind.Opponent);
