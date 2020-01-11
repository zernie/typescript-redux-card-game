import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  Character,
  EntityContainer,
  Weapon,
  isMinion,
  getWeapon,
  getEntity
} from "../../../models";
import {
  attackCharacter,
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload
} from "./actions";
import { EntityPayloadAction } from "../../utils";

const equipWeaponHandler = (
  state: EntityContainer,
  action: PayloadAction<EquipWeaponPayload>
) => {
  state[action.payload.id] = action.payload.weapon;
};

const destroyWeaponHandler = (
  state: EntityContainer,
  action: EntityPayloadAction
) => {
  delete state[action.payload.id];
};

const attackCharacterHandler = (
  state: EntityContainer,
  { payload }: EntityPayloadAction
) => {
  const attacker = state[payload.id] as Character;

  if (isMinion(attacker)) return;

  if (attacker.weaponID) {
    const weapon = getEntity(state, attacker.weaponID) as Weapon;
    weapon.health--;
  }
};

export default createReducer(
  {},
  {
    [destroyWeapon.type]: destroyWeaponHandler,
    [equipWeapon.type]: equipWeaponHandler,
    [attackCharacter.type]: attackCharacterHandler
  }
);
