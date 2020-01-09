import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { EntityContainer, Hero, Player, Weapon } from "../../../models";
import {
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload,
  fatigueDamage,
  FatigueDamagePayload
} from "./actions";
import { getEntity } from "../../utils";

const destroyWeaponHandler = (
  state: EntityContainer,
  { payload: { heroId, attack } }: PayloadAction<Weapon>
) => {
  const hero = state[heroId] as Hero;
  hero.weaponID = null;
  hero.attack = Math.min(hero.attack - attack, 0);
};

const equipWeaponHandler = (
  state: EntityContainer,
  { payload: { weapon } }: PayloadAction<EquipWeaponPayload>
) => {
  const hero = state[weapon.heroId] as Hero;
  hero.attack += weapon.attack;
  hero.weaponID = weapon.id;
};

const fatigueDamageHandler = (
  state: EntityContainer,
  { payload }: PayloadAction<FatigueDamagePayload>
) => {
  const hero = state[payload.heroId] as Hero;
  const player = state[payload.id] as Player;
  const dmg = player.fatigue == 0 ? 1 : player.fatigue + 1;
  hero.health -= dmg;
  hero.destroyed = hero.health <= 0;
};

export default createReducer<EntityContainer>(
  {},
  {
    [destroyWeapon.type]: destroyWeaponHandler,
    [equipWeapon.type]: equipWeaponHandler,
    [fatigueDamage.type]: fatigueDamageHandler
  }
);
