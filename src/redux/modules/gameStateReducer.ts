import _ from "lodash/fp";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { State } from "../../types";
import {
  AppThunk,
  Step,
  getActivePlayer,
  selectCards,
  getOpponent,
  getPlayer,
  other,
  hasLost
} from "../../types";
import { drawCard } from "./deckReducer";
import { gainMana, restoreMana } from "./play/actions";
import initialState from "./initialState";

export const finishGame = createAction("FINISH_GAME");
export const nextTurn = createAction("NEXT_TURN");

const finishGameHandler = (state: State) => {
  state.step = Step.FinalGameOver;
};

const nextTurnHandler = (state: State) => {
  state.turn++;
  state.activePlayer = other(state);
  // state.activePlayer = other(state.activePlayer);
};

export const checkForEndGame = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const player = getPlayer(state);
  const opponent = getOpponent(state);
  console.log(player, opponent);

  if (hasLost(player) || hasLost(opponent)) {
    dispatch(finishGame());
  }
};

export const endTurn = (): AppThunk => (dispatch, getState) => {
  dispatch(nextTurn());
  const state = getState();
  const player = getActivePlayer(state);

  dispatch(gainMana({ id: player.id }));
  dispatch(restoreMana({ id: player.id }));

  const cards = _.values(selectCards(player.id, state.deck));

  if (cards.length > 0) {
    dispatch(drawCard(cards[0]));
  }
};

export default createReducer(
  initialState.state, // TODO: remove
  {
    [nextTurn.type]: nextTurnHandler,
    [finishGame.type]: finishGameHandler
  }
);
