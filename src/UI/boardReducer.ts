import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Board } from '../Board';
import { Minion } from '../Minion';
import { board } from './initialState';
import { nextTurn } from './gameStateReducer';
import { AttackFacePayload, attackHero } from './characterReducer';

const actionCreator = actionCreatorFactory();
export const exhaustMinion = actionCreator<Minion>('EXHAUST_MINION');
export const summonMinion = actionCreator<Minion>('SUMMON_MINION');

export const attackHeroHandler = (
  state: Board,
  payload: AttackFacePayload
): Board =>
  R.evolve(
    {
      [payload.source.id]: { attacksPerformed: R.inc },
    },
    state
  );

const exhaustMinionHandler = (state: Board, payload: Minion): Board =>
  R.assocPath([payload.id, 'exhausted'], true, state);

export const nextTurnHandler = R.map<Minion, Board>(
  R.assoc('exhausted', false)
);

export const summonMinionHandler = (state: Board, payload: Minion): Board =>
  R.assoc(payload.id, payload, state);

export default reducerWithInitialState<Board>(board)
  .case(attackHero, attackHeroHandler)
  .case(exhaustMinion, exhaustMinionHandler)
  .case(nextTurn, nextTurnHandler)
  .case(summonMinion, summonMinionHandler);
