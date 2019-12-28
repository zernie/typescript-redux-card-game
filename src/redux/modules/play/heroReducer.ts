import { createReducer } from "@reduxjs/toolkit";
import { Hero, EntityContainer } from "../../../types";
import { destroyWeapon, equipWeapon, EquipWeaponPayload } from "./actions";
import { getEntity, HeroHandler } from "../../utils";

const destroyWeaponHandler: HeroHandler = (state: Hero) => {
  state.weaponId = null;
};

const equipWeaponHandler: HeroHandler<EquipWeaponPayload> = (
  state,
  payload
) => {
  state.weaponId = payload.weapon.id;
};

export default createReducer<EntityContainer>(
  {},
  {
    [destroyWeapon.type]: getEntity(destroyWeaponHandler),
    [equipWeapon.type]: getEntity(equipWeaponHandler)
  }
);
