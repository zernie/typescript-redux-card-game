import * as _ from "lodash/fp";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
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

// const destroyWeaponHandler = (state: Player) => { state.weapon = null; };
const destroyWeaponHandler = (state: Player) => {
  state.weapon = 0;
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
  if (state.maximumMana < 10) {
    state.mana += amount;
  }
};

const restoreManaHandler = (state: Player) => {
  state.mana = state.maximumMana;
};

const spendManaHandler = (
  state: Player,
  { payload: { amount } }: PayloadAction<SpendManaPayload>
) => {
  if (canSpendMana(state, amount)) {
    state.mana -= amount;
  }
};

export default createReducer<Player|null>(null, {
    [destroyWeapon]: destroyWeaponHandler,
    [equipWeapon]: equipWeaponHandler,
    [gainMana]: gainManaHandler,
    [restoreMana]: restoreManaHandler,
    [spendMana]: spendManaHandler
  }
);
