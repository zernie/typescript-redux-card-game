import * as R from 'ramda';
import { ThunkAction } from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { gainMana, restoreMana } from './characterReducer';
import { currentPlayer, Game, State } from '../Game';
import { other, PlayerKind } from '../Hero';
import initialState from './initialState';

const actionCreator = actionCreatorFactory();

const turnLens = R.lensProp<number, State>('turn');
const activePlayerLens = R.lensProp<PlayerKind, State>('activePlayer');

export const nextTurn = actionCreator('NEXT_TURN');

const nextTurnHandler = R.pipe(
  R.over(turnLens, R.inc),
  R.over(activePlayerLens, other)
);

export const endTurn = (): ThunkAction<void, Game, {}> => (
  dispatch,
  getState
) => {
  const player = currentPlayer(getState());

  const newPlayer = other(player.owner);
  dispatch(gainMana({ player: other(player.owner) }));
  dispatch(restoreMana(newPlayer));
  dispatch(nextTurn());
};

export default reducerWithInitialState<State>(initialState.state).case(
  nextTurn,
  nextTurnHandler
);
