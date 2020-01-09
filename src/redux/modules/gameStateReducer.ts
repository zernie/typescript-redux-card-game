import _ from "lodash/fp";
import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  AppThunk,
  Step,
  getActivePlayer,
  selectCards,
  getPlayer,
  otherId,
  hasLost, State, getOpponent
} from "../../models";
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
  state.activePlayer = otherId(state);
};

export const checkForEndGame = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const player = getPlayer(state);
  const opponent = getOpponent(state);

  // if (hasLost(player) || hasWon(player)) {
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
    // if (deck.length === 0) {
    //   dispatch({
    //     type: FATIGUE,
    //     heroId,
    //   });
    // } else if (hand.length === 10) {
    //   dispatch({
    //     type: BURN_CARD,
    //     playerId,
    //   });
    // } else {
    dispatch(drawCard(cards[0]));
    // }
  }
};

export default createReducer(
  initialState.state, // TODO: remove
  {
    [nextTurn.type]: nextTurnHandler,
    [finishGame.type]: finishGameHandler
  }
);
