import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { EntityContainer, EntityPayload } from "../../../types/Entity";
import { destroyWeapon, equipWeapon, EquipWeaponPayload } from "./actions";

const equipWeaponHandler = (
  state: EntityContainer,
  action: PayloadAction<EquipWeaponPayload>
) => {
  state[action.payload.id] = action.payload.weapon;
};

const destroyWeaponHandler = (
  state: EntityContainer,
  action: PayloadAction<EntityPayload>
) => {
  delete state[action.payload.id];
};

export default createReducer({}, {
  [destroyWeapon.type]: destroyWeaponHandler,
  [equipWeapon.type]: equipWeaponHandler
});
