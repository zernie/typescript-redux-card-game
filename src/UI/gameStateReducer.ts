import * as R from 'ramda';
import { ThunkAction } from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { gainMana, restoreMana } from './heroReducer';
import { Game, State } from '../Game';
import { activeHero, other } from '../Hero';
import initialState from './initialState';

const actionCreator = actionCreatorFactory();

export const nextTurn = actionCreator('NEXT_TURN');

const nextTurnHandler = R.evolve<State>({
  turn: R.inc,
  activePlayer: other,
});

export const endTurn = (): ThunkAction<void, Game, {}> => (
  dispatch,
  getState
) => {
  dispatch(nextTurn());

  const player = activeHero(getState());
  dispatch(gainMana({ id: player.id }));
  dispatch(restoreMana({ id: player.id }));
};

export default reducerWithInitialState<State>(initialState.state).case(
  nextTurn,
  nextTurnHandler
);
