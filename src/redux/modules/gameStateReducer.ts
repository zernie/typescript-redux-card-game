import _ from "lodash/fp";
import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  AppThunk,
  GameState,
  Step,
  TriggerType,
  getActivePlayer,
  getOpponent,
  getPlayer,
  hasLost,
  MAX_CARDS_IN_HAND,
  otherId,
  ownerCards
} from "../../models";
import { burnCard, drawCard } from "./deckReducer";
import {
  fatigueDamage,
  gainMana,
  processDeaths,
  restoreMana,
  triggerEvent
} from "./play/actions";
import initialState from "./initialState";
import Toastr from "toastr";

export const finishGame = createAction("FINISH_GAME");
export const nextTurn = createAction("NEXT_TURN");

const finishGameHandler = (state: GameState) => {
  state.step = Step.FinalGameOver;
};

const nextTurnHandler = (state: GameState) => {
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
  // dispatch(triggerEvent({trigger: TriggerType.TurnEnd, id: }));
  dispatch(nextTurn());
  const game = getState();
  const player = getActivePlayer(game);
  Toastr.info(`${player.name}'s turn!`);
  const { id } = player;

  dispatch(gainMana({ id }));
  dispatch(restoreMana({ id }));

  const deck = _.values(ownerCards(id, game.deck));
  const hand = _.values(ownerCards(id, game.hand));

  if (deck.length > 0) {
    const topCard = deck[0];
    if (hand.length === MAX_CARDS_IN_HAND) {
      Toastr.error(`Cant draw more cards from the ${player.name}'s deck!`);
      dispatch(burnCard({ id: topCard.id }));
    } else {
      dispatch(drawCard(topCard));
    }
  } else {
    Toastr.error(`No more cards left in the ${player.name}'s deck!`);

    dispatch(fatigueDamage({ id: player.id, heroId: player.heroID as number }));
  }

  dispatch(processDeaths());
  dispatch(checkForEndGame());
};

export default createReducer(
  initialState.state, // TODO: remove
  {
    [nextTurn.type]: nextTurnHandler,
    [finishGame.type]: finishGameHandler
  }
);
