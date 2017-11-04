import * as R from 'ramda';
import { Mechanics } from './Mechanics';
import { PlayerKind } from './Player';
import { Character } from './Character';

export type Minion = Readonly<Character & {
  id: number;
}>;

let _lastId = 0;
const newId = (): number => new Date().getTime() + _lastId++;
const selectMinions = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerMinions = selectMinions(PlayerKind.Player);
export const opponentMinions = selectMinions(PlayerKind.Opponent);
export const craftMinion = (props: {
  attack: number,
  health: number,
  name: string,
  attacksPerformed?: number,
  id?: number,
  mechanics?: Array<Mechanics>,
  owner: PlayerKind,
}): Minion => ({
  attacksPerformed: 0,
  id: newId(),
  mechanics: [],
  ...props,
});
