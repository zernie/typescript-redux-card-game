import * as R from 'ramda';
import { EntityContainer } from './EntityContainer';
import { Character } from './Character';
import { CardType } from './enums';
import { Minion } from './Minion';

export type Board = EntityContainer<Character>;
export type MinionContainer = EntityContainer<Minion>;

export const boardFrom = (array: Array<Character>): Board =>
  R.indexBy<Character>(R.prop('id'), array);

export const minionsFrom = (board: Board): MinionContainer =>
  R.filter(R.propEq('type', CardType.Minion), board);
