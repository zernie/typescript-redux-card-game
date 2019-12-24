import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Hero, reduceArmor, reduceHealth } from '../../../Hero';
import { dealDamage, DealDamagePayload } from '../actions';
import { EntityPayload } from '../../../Entity';

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
    [dealDamage.type]: damageHeroHandler
  })(state, action);
