import * as _ from "lodash/fp";
import { ThunkAction } from "redux-thunk";
import { createReducer, createAction } from "@reduxjs/toolkit";
import { Game, getDeck, State } from "../Game";
import { activeHero } from "../Hero";
import { PlayState, Step } from "../enums";
import { selectCards } from "../Card";
import { getOpponent, getPlayer, other } from "../Player";
import initialState from "./initialState";
import { drawCard } from "./Deck/deckReducer";
import { gainMana, restoreMana } from "./Board/actions";

export const finishGame = createAction<void>("FINISH_GAME");
export const nextTurn = createAction<void>("NEXT_TURN");

const finishGameHandler = (state: State) => {
  state.step = Step.FinalGameOver;
};
const nextTurnHandler = (state: State) => {
  state.turn++;
  state.activePlayer = other(state.activePlayer);
};

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

  // const cards = _.values(selectCards(player.owner, getDeck(state)));
  const cards = _.values(selectCards(player.owner)(getDeck(state)));

  if (cards.length > 0) {
    dispatch(drawCard(cards[0].id));
  }
};

const reducer = createReducer<State>(initialState.state, {
  nextTurn: nextTurnHandler,
  finishGame: finishGameHandler
});
export default reducer;
