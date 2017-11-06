import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Board } from '../Board';
import { Minion } from '../Minion';
import { board } from './initialState';

const actionCreator = actionCreatorFactory();
export const summonMinion = actionCreator<Minion>('SUMMON_MINION');

export const summonMinionHandler = (state: Board, payload: Minion) =>
  R.assoc(payload.id, payload, state) as Board;

export default reducerWithInitialState<Board>(board).case(
  summonMinion,
  summonMinionHandler
);
