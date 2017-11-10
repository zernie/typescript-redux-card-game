import * as R from 'ramda';
import { Minion } from './Minion';
import { EntityContainer } from './EntityContainer';

export type Board = EntityContainer<Minion>;
export const boardFrom = (array: Array<Minion>): Board => R.indexBy<Minion>(R.prop('id'), array);
