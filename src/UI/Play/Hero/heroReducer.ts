import { Action, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Hero, reduceArmor, reduceHealth } from "../../../Hero";
import {
  dealDamage,
  DealDamagePayload,
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload
} from "../actions";
import { EntityContainer, EntityPayload } from "../../../Entity";
import { getEntity, Handler } from "../utils";

type HeroHandler<T = EntityPayload> = Handler<Hero, T>;

const destroyWeaponHandler: HeroHandler = (state: Hero) => {
  state.weaponId = null;
};

const equipWeaponHandler: HeroHandler<EquipWeaponPayload> = (
  state,
  payload
) => {
  state.weaponId = payload.weapon.id;
};

//  FIXME
const damageHeroHandler: HeroHandler<DealDamagePayload> = (
  state,
  payload
) => {
  const health = reduceHealth(state, payload.amount);
  state.armor = reduceArmor(state, payload.amount);
  state.destroyed = health <= 0;
  state.health = health;
};

export default createReducer<EntityContainer>({}, {
    [dealDamage.type]: getEntity(damageHeroHandler),
    [destroyWeapon.type]: getEntity(destroyWeaponHandler),
    [equipWeapon.type]: getEntity(equipWeaponHandler)
  });
