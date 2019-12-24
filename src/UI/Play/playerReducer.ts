import { createReducer, PayloadAction } from "@reduxjs/toolkit";
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
import { EntityPayload } from "../../Entity";
import { PlayState } from "../../enums";

const MAX_MANA = 10;

const gainManaHandler = (
  state: Player,
  { payload: { amount = 1 } }: PayloadAction<GainManaPayload>
) => {
  if (state.maximumMana >= MAX_MANA)
    return console.warn(`Cannot gain more than max mana (${MAX_MANA}).`);

  state.mana += amount;
};

const restoreManaHandler = (state: Player) => {
  state.mana = state.maximumMana;
};

const spendManaHandler = (
  state: Player,
  { payload: { amount } }: PayloadAction<SpendManaPayload>
) => {
  if (!canSpendMana(state, amount))
    return alert(`Cannot spend more than current mana (${state.mana}).`);

  state.mana -= amount;
};

const dealDamageHandler = (
  state: Player,
  action: PayloadAction<DealDamagePayload>
) => {
  if (action.payload.character.destroyed) state.playState = PlayState.Lost;
};

// TODO: refactor
export default (state: Player, action: PayloadAction<EntityPayload>) =>
  createReducer<Player>(state, {
    [gainMana.type]: gainManaHandler,
    [restoreMana.type]: restoreManaHandler,
    [spendMana.type]: spendManaHandler,
    [dealDamage.type]: dealDamageHandler
  })(state, action);
