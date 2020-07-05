// import _ from "lodash/fp";
import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  AppThunk,
  Card,
  CardContainer,
  canSpendMana,
  getActivePlayer,
  CardType,
  Zone,
  hasCharge
} from "../../models";
import { equipWeapon, spendMana, summonMinion } from "./play/actions";
import { drawCard } from "./deckReducer";

export const playCard = createAction<Card>("PLAY_CARD");

export const playerUseCard = (payload: Card): AppThunk => (
  dispatch,
  getState
) => {
  const state = getState();
  // const heroID = activeHero(state);
  const player = getActivePlayer(state);
  if (!canSpendMana(getActivePlayer(state), payload.cost)) {
    return console.warn("Not enough mana!");
  }

  dispatch(playCard(payload));
  dispatch(spendMana({ amount: payload.cost, id: player.id }));

  switch (payload.type) {
    case CardType.Minion:
      const minion = {
        ...payload,
        zone: Zone.Play,
        exhausted: !hasCharge(payload)
      };
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
  const card = { ...action.payload, zone: Zone.Hand } as Card;
  state[action.payload.id] = card;
};

export default createReducer<CardContainer>(
  {},
  {
    [playCard.type]: playCardHandler,
    [drawCard.type]: drawCardHandler
  }
);
