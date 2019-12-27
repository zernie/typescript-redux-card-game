import { createReducer, PayloadAction, Reducer } from "@reduxjs/toolkit";
import {
  dealDamage,
  DealDamagePayload,
  gainMana,
  GainManaPayload,
  restoreMana,
  spendMana,
  SpendManaPayload
} from "./actions";
import { canSpendMana, Player } from "../../Player";
import { EntityContainer, } from "../../Entity";
import { PlayState } from "../../enums";
import { MAX_MANA } from "../../constants";
import { getEntity, PlayerHandler } from "./utils";


const gainManaHandler: PlayerHandler<GainManaPayload> = (
  state,
  { amount = 1 }
) => {
  if (state.maximumMana >= MAX_MANA)
    return console.warn(`Cannot gain more than max mana (${MAX_MANA}).`);

  state.mana += amount;
};

const restoreManaHandler: PlayerHandler<GainManaPayload> = state => {
  state.mana = state.maximumMana;
};

const spendManaHandler: PlayerHandler<SpendManaPayload> = (
  state: Player,
  {  amount }
) => {
  if (!canSpendMana(state, amount))
    return console.warn(
      `Cannot spend more than current mana amount (${state.mana}).`
    );

  state.mana -= amount;
};

const dealDamageHandler: PlayerHandler<DealDamagePayload> = (state, payload) => {
  if (!payload.character.destroyed) return;

  state.playState = PlayState.Lost;
};

export default createReducer<EntityContainer>({}, {
  [gainMana.type]: getEntity(gainManaHandler),
  [restoreMana.type]: getEntity(restoreManaHandler),
  [spendMana.type]: getEntity(spendManaHandler),
  [dealDamage.type]: getEntity(dealDamageHandler)
});
