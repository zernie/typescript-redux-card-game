import { Action, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Hero, reduceArmor, reduceHealth } from "../../../Hero";
import {
  dealDamage,
  DealDamagePayload,
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload
} from "../actions";
import { EntityPayload } from "../../../Entity";

const destroyWeaponHandler = (state: Hero, action: Action) => {
  state.weaponId = null;
};

const equipWeaponHandler = (
  state: Hero,
  action: PayloadAction<EquipWeaponPayload>
) => {
  state.weaponId = action.payload.weapon.id;
};

const damageHeroHandler = (
  state: Hero,
  { payload }: PayloadAction<DealDamagePayload>
) => {
  const health = reduceHealth(state, payload.amount);
  state.armor = reduceArmor(state, payload.amount);
  state.destroyed = health <= 0;
  state.health = health;
};

// TODO: refactor
export default (state: Hero, action: PayloadAction<EntityPayload>) =>
  createReducer(state, {
    [dealDamage.type]: damageHeroHandler,
    [destroyWeapon.type]: destroyWeaponHandler,
    [equipWeapon.type]: equipWeaponHandler
  })(state, action);
