import * as _ from "lodash/fp";
import { Action, createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload,
  gainMana,
  GainManaPayload,
  restoreMana,
  spendMana,
  SpendManaPayload
} from "./actions";
import { canSpendMana, Player } from "../../Player";
import { EntityPayload } from '../../Entity';

const MAX_MANA = 10;

const destroyWeaponHandler = (state: Player, action: Action) => {
  // state.weapon = 0;
  state.weapon = null;
};

const equipWeaponHandler = (
  state: Player,
  action: PayloadAction<EquipWeaponPayload>
) => {
  state.weapon = action.payload.weapon.id;
};

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
    return console.warn(`Cannot spend more than current mana (${state.mana}).`);

  state.mana -= amount;
};

// TODO: refactor
export default ((
  state: Player,
  action: PayloadAction<EntityPayload>) => createReducer<Player>(state, {
  [destroyWeapon.type]: destroyWeaponHandler,
  [equipWeapon.type]: equipWeaponHandler,
  [gainMana.type]: gainManaHandler,
  [restoreMana.type]: restoreManaHandler,
  [spendMana.type]: spendManaHandler
})(state, action));
