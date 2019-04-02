import { ThunkAction } from "redux-thunk";
import * as _ from "lodash/fp";
// import { Action, AnyAction, createAction, createReducer } from 'redux-starter-kit';
import { createReducer, createAction } from 'redux-starter-kit/src';
import { Card, CardContainer } from "../../Card";
import { Game } from "../../Game";
import { activeHero, canSpendMana } from "../../Hero";
import { summonMinion } from "../Board/boardReducer";
import { equipWeapon, spendMana } from "../Board/Hero/actions";
import { CardType, Zone } from "../../enums";
import { AnyAction } from 'redux';

export const removeCard = createAction<Card>("REMOVE_CARD");

export const playCard = (payload: Card): ThunkAction<void, Game, {}> => (
  dispatch,
  getState
) => {
  const hero = activeHero(getState());
  if (!canSpendMana(hero, payload.cost)) {
    return;
  }

  dispatch(removeCard(payload));
  dispatch(spendMana({ amount: payload.cost, id: hero.id }));

  switch (payload.type) {
    case CardType.Minion:
      dispatch(summonMinion(payload));
      break;
    case CardType.Weapon:
      dispatch(equipWeapon({ id: hero.id, weapon: payload }));
      return;
    default:
      return;
  }
};

export const removeCardHandler = (
  state: CardContainer,
  action: AnyAction//Action<Card>
): CardContainer => { state[action.payload.id].zone = Zone.Graveyard; return undefined };

export default createReducer<CardContainer>(undefined, {
  [removeCard]: removeCardHandler
})
