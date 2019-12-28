// import _ from "lodash/fp";
import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardContainer } from "../../types/Card";
import { getActivePlayer } from "../../types/Hero";
import { equipWeapon, spendMana, summonMinion } from "./play/actions";
import { CardType } from "../../types/enums";
import { AppThunk } from "../../types/utils";
import { drawCard } from "./deckReducer";
import { canSpendMana } from "../../types/Player";
import { craftMinion } from "../../types/Minion";

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
      const minion = craftMinion(payload);
      minion.zone = Zone.Play;
      dispatch(summonMinion(minion));
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
