import _ from "lodash/fp";
import { ThunkAction } from "redux-thunk";
import { createAction, createReducer } from "redux-starter-kit/src";
import { gainMana, restoreMana } from "./Board/Hero/actions";
import { Game, getDeck, State } from "../Game";
import { activeHero, getOpponent, getPlayer, other } from "../Hero";
import initialState from "./initialState";
import { drawCard } from "./Deck/deckReducer";
import { selectCards } from "../Card";
import { PlayState, Step } from "../enums";

export const finishGame = createAction<void>("FINISH_GAME");
export const nextTurn = createAction<void>("NEXT_TURN");

const finishGameHandler = R.evolve<State>({
  step: () => Step.FinalGameOver
});

const nextTurnHandler = R.evolve<State>({
  turn: R.inc,
  activePlayer: other
});

export const checkForEndGame = (): ThunkAction<void, Game, {}> => (
  dispatch,
  getState
) => {
  const state = getState();
  const player = getPlayer(state);
  const opponent = getOpponent(state);

  if (
    player.playState === PlayState.Lost ||
    opponent.playState === PlayState.Lost
  ) {
    dispatch(finishGame());
  }
};

export const endTurn = (): ThunkAction<void, Game, {}> => (
  dispatch,
  getState
) => {
  dispatch(nextTurn());
  const state = getState();

  const player = activeHero(state);

  dispatch(gainMana({ id: player.id }));
  dispatch(restoreMana({ id: player.id }));

  const cards = R.values(selectCards(player.owner, getDeck(state)));

  if (cards.length > 0) {
    dispatch(drawCard(cards[0].id));
  }
};

export default createReducer(initialState.state, {
  [nextTurn]: nextTurnHandler,
  [finishGame]: finishGameHandler
})
