import actionCreatorFactory, { Action } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Board } from '../Board';
import { Minion } from '../Minion';
import { board } from './initialState';
import { nextTurn } from './gameStateReducer';
import {
  attackCharacter,
  CharactersPayload,
  dealDamage,
  default as characterReducer,
  exhaust,
} from './characterReducer';
import { getEntity } from '../EntityContainer';
import { Character } from '../Character';

const actionCreator = actionCreatorFactory();

export const summonMinion = actionCreator<Minion>('SUMMON_MINION');

const nextTurnHandler = R.map(R.assoc('exhausted', false));

const summonMinionHandler = (state: Board, payload: Minion): Board =>
  R.assoc(payload.id, payload, state);

const characterHandler = (
  state: Board,
  action: Action<CharactersPayload>
): Board =>
  R.assoc(
    action.payload.source.id,
    characterReducer(
      getEntity<Character>(action.payload.source.id, state),
      action
    ),
    state
  );

export default reducerWithInitialState<Board>(board)
  .case(nextTurn, nextTurnHandler)
  .case(summonMinion, summonMinionHandler)
  .casesWithAction([attackCharacter, dealDamage, exhaust], characterHandler);
