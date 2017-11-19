import * as R from 'ramda';
import { ThunkAction } from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { gainMana, restoreMana } from './Board/Hero/actions';
import { Game, State } from '../Game';
import { activeHero, other } from '../Hero';
import initialState from './initialState';
import { drawCard } from './Deck/deckReducer';

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
  const state = getState();

  const player = activeHero(state);

  dispatch(gainMana({ id: player.id }));
  dispatch(restoreMana({ id: player.id }));

  const cards = R.values(state.deck);

  if (cards.length > 0) {
    dispatch(drawCard(cards[0]));
  }
};

export default reducerWithInitialState<State>(initialState.state).case(
  nextTurn,
  nextTurnHandler
);
