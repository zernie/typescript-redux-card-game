// import _ from "lodash/fp";
import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardContainer } from "../../Card";
import { getActivePlayer } from "../../Hero";
import { equipWeapon, spendMana, summonMinion } from "../Play/actions";
import { CardType } from "../../enums";
import { AppThunk } from "../../utils";
import { drawCard } from "../Deck/deckReducer";
import { canSpendMana } from "../../Player";

export const playCard = createAction<Card>("PLAY_CARD");

export const playerUseCard = (payload: Card): AppThunk => (
  dispatch,
  getState
) => {
  const state = getState();
  // const hero = activeHero(state);
  const player = getActivePlayer(state);
  if (!canSpendMana(getActivePlayer(state), payload.cost)) {
    return alert("Not enough mana!");
  }

  dispatch(playCard(payload));
  dispatch(spendMana({ amount: payload.cost, id: player.id }));

  switch (payload.type) {
    case CardType.Minion:
      dispatch(summonMinion(payload));
      break;
    case CardType.Weapon:
      dispatch(equipWeapon({ id: payload.id, weapon: payload }));
      return;
    default:
      alert(`Unknown card type: ${payload.type}`);
      throw new Error("Not implemented yet!");
  }
};

export const playCardHandler = (
  state: CardContainer,
  action: PayloadAction<Card>
) => {
  // state[action.payload.id].zone = Zone.Graveyard;
  delete state[action.payload.id];
};

const drawCardHandler = (state: CardContainer, action: PayloadAction<Card>) => {
  state[action.payload.id] = action.payload;
};

export default createReducer<CardContainer>(
  {},
  {
    [playCard.type]: playCardHandler,
    [drawCard.type]: drawCardHandler
  }
);
