import { Hero, reduceArmor, reduceHealth } from "../../../Hero";
import { dealDamage, DealDamagePayload } from "../actions";
import { createReducer } from '@reduxjs/toolkit';

const damageHeroHandler = (state: Hero, payload: DealDamagePayload) => {
  const health = reduceHealth(state, payload.amount);
  state.armor = reduceArmor(state, payload.amount);
  state.destroyed = health <= 0;
  state.health = health;
};

export default createReducer<Hero|null>(null, {
    [dealDamage]: damageHeroHandler,
});
