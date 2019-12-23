import { ThunkAction } from "redux-thunk";
import * as _ from "lodash/fp";
import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardContainer } from "../../Card";
import { Game } from "../../Game";
import { canSpendMana, getActivePlayer } from "../../Hero";
import { summonMinion } from "../Board/actions";
import { equipWeapon, spendMana } from "../Board/actions";
import { CardType, Zone } from "../../enums";
import { AppThunk } from '../../utils';

export const removeCard = createAction<Card>("REMOVE_CARD");

export const playCard = (payload: Card): AppThunk => (
  dispatch,
  getState
) => {
  const state = getState();
  const hero = activeHero(state);
  if (!canSpendMana(getActivePlayer(state), payload.cost)) {
    return console.warn("Cannot spend mana");
  }

  dispatch(removeCard(payload));
  dispatch(spendMana({ amount: payload.cost, id: hero.id }));

  switch (payload.type) {
    case CardType.Minion:
      dispatch(summonMinion(payload));
      break;
    case CardType.Weapon:
      dispatch(equipWeapon({ id: payload.id, weapon: payload }));
      return;
    default:
      return;
  }
};

export const removeCardHandler = (
  state: CardContainer,
  action: PayloadAction<Card>
): CardContainer => {
  state[action.payload.id].zone = Zone.Graveyard;
  return state;
};

export default createReducer<CardContainer>(
  {},
  {
    [removeCard]: removeCardHandler
  }
);
