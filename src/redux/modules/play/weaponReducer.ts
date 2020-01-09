import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  Character,
  EntityContainer,
  EntityPayload,
  isMinion,
  Weapon
} from "../../../models";
import {
  attackCharacter,
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload
} from "./actions";

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

const attackCharacterHandler = (
  state: EntityContainer,
  { payload }: PayloadAction<EntityPayload>
) => {
  const char = state[payload.id] as Character;

  if (isMinion(char)) return;

  const weapon = char.weaponID && (state[char.weaponID] as Weapon);
  if (!weapon) return;
  weapon.durability--;
};

export default createReducer(
  {},
  {
    [destroyWeapon.type]: destroyWeaponHandler,
    [equipWeapon.type]: equipWeaponHandler,
    [attackCharacter.type]: attackCharacterHandler
  }
);
