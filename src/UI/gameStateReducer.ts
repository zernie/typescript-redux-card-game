import * as R from 'ramda';
import { ThunkAction } from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { gainMana, restoreMana } from './characterReducer';
import { State } from '../Game';
import { other, PlayerKind } from '../Hero';
import initialState from './initialState';

const actionCreator = actionCreatorFactory();

// const turnLens = R.lensProp<number, State>('turn');
const activePlayerLens = R.lensProp<PlayerKind, State>('activePlayer');

export const nextTurn = actionCreator('NEXT_TURN');

const activePlayerHandler = R.over(activePlayerLens, other);
// const nextTurnHandler = R.over(turnLens, R.inc);

export const endTurn = (): ThunkAction<void, {}, {}> => dispatch => {
  dispatch(gainMana());
  dispatch(restoreMana());
  dispatch(nextTurn());
};

export default reducerWithInitialState<State>(initialState.state)
  .case(nextTurn, activePlayerHandler);
  // .case(nextTurn, nextTurnHandler);
