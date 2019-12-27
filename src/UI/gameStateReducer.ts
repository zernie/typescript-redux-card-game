import * as _ from "lodash/fp";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { State } from "../Game";
import { activeHero, getActivePlayer } from "../Hero";
import { PlayState, Step } from "../enums";
import { selectCards } from "../Card";
import { getOpponent, getPlayer, other } from "../Player";
import initialState from "./initialState";
import { drawCard } from "./Deck/deckReducer";
import { gainMana, restoreMana } from "./Play/actions";
import { AppThunk } from "../utils";

export const finishGame = createAction<void>("FINISH_GAME");
export const nextTurn = createAction<void>("NEXT_TURN");

const finishGameHandler = (state: State) => {
  state.step = Step.FinalGameOver;
};
const nextTurnHandler = (state: State) => {
  state.turn++;
  state.activePlayer = other(state.activePlayer);
};

export const checkForEndGame = (): AppThunk => (dispatch, getState) => {
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

export const endTurn = (): AppThunk => (dispatch, getState) => {
  dispatch(nextTurn());
  const state = getState();
  const player = getActivePlayer(state);

  dispatch(gainMana({ id: player.id }));
  dispatch(restoreMana({ id: player.id }));

  const cards = _.values(selectCards(player.owner, state.deck));

  if (cards.length > 0) {
    dispatch(drawCard(cards[0]));
  }
};

const reducer = createReducer<State>(initialState.state, {
  [nextTurn.type]: nextTurnHandler,
  [finishGame.type]: finishGameHandler
});
export default reducer;
