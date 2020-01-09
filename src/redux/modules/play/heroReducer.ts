import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { EntityContainer, Hero, Player } from "../../../models";
import {
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload,
  fatigueDamage,
  FatigueDamagePayload
} from "./actions";
import { getEntity, HeroHandler } from "../../utils";

const destroyWeaponHandler: HeroHandler = (state: Hero) => {
  state.weaponID = null;
};

const equipWeaponHandler: HeroHandler<EquipWeaponPayload> = (
  state,
  payload
) => {
  state.weaponID = payload.weapon.id;
};

const fatigueDamageHandler = (
  state: EntityContainer,
  { payload }: PayloadAction<FatigueDamagePayload>
) => {
  const hero = state[payload.heroId] as Hero;
  const player = state[payload.id] as Player;
  const dmg = player.fatigue == 0 ? 1 : player.fatigue + 1;
  hero.health -= dmg;
};

export default createReducer<EntityContainer>(
  {},
  {
    [destroyWeapon.type]: getEntity(destroyWeaponHandler),
    [equipWeapon.type]: getEntity(equipWeaponHandler),
    [fatigueDamage.type]: fatigueDamageHandler
  }
);
