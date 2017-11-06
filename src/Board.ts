import { Minion } from './Minion';
import * as R from 'ramda';

export type Board = {
  [id: number]: Minion;
};

export const boardFrom = (array: Array<Minion>): Board => R.indexBy<Minion>(R.prop('id'), array);
