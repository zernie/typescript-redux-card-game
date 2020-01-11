import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  calculateFatigueDmg,
  EntityContainer,
  Hero,
  Player,
  shouldBeDestroyed,
  Weapon
} from "../../../models";
import {
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload,
  fatigueDamage,
  FatigueDamagePayload
} from "./actions";
import { extractEntity } from "../../utils";

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

// TODO: use simple DEAL_DAMAGE action?
const fatigueDamageHandler = (
  state: EntityContainer,
  { payload }: PayloadAction<FatigueDamagePayload>
) => {
  const hero = state[payload.heroId] as Hero;
  const player = state[payload.id] as Player;

  hero.health -= calculateFatigueDmg(player);
  hero.destroyed = shouldBeDestroyed(hero);
};

export default createReducer<EntityContainer>(
  {},
  {
    [destroyWeapon.type]: destroyWeaponHandler,
    [equipWeapon.type]: equipWeaponHandler,
    [fatigueDamage.type]: fatigueDamageHandler
  }
);
