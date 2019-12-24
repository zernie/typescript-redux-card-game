// import _ from "lodash/fp";
import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Card, CardContainer } from '../../Card';
import { activeHero, canSpendMana, getActivePlayer } from '../../Hero';
import { equipWeapon, spendMana, summonMinion } from '../Play/actions';
import { CardType, Zone } from '../../enums';
import { AppThunk } from '../../utils';
import { original } from 'immer';

export const removeCard = createAction<Card>("REMOVE_CARD");

export const playCard = (payload: Card): AppThunk => (dispatch, getState) => {
  const state = getState();
  const hero = activeHero(state);
  const player = getActivePlayer(state);
  if (!canSpendMana(getActivePlayer(state), payload.cost)) {
    console.log(getActivePlayer(state), payload.cost);
    return alert("Not enough mana!");
  }

  dispatch(removeCard(payload));
  dispatch(spendMana({ amount: payload.cost, id: player.id }));

  switch (payload.type) {
    case CardType.Minion:
      dispatch(summonMinion(payload));
      break;
    case CardType.Weapon:
      dispatch(equipWeapon({ id: payload.id, weapon: payload }));
      return;
    default:
      return alert(`Unknown card type: ${payload.type}`);
  }
};

export const removeCardHandler = (
  state: CardContainer,
  action: PayloadAction<Card>
) => {
  console.log(action.payload.id, original(state));
  state[action.payload.id].zone = Zone.Graveyard;
};

export default createReducer<CardContainer>(
  {},
  {
    [removeCard.type]: removeCardHandler
  }
);
