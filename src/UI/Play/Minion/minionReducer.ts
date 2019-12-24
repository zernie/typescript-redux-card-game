import { createReducer, PayloadAction } from "@reduxjs/toolkit";
// import * as _ from "lodash/fp";
import { reduceHealth } from "../../../Hero";
import { dealDamage, DealDamagePayload } from "../actions";
import { Minion } from "../../../Minion";
import { EntityPayload } from "../../../Entity";

const damageMinionHandler = (
  state: Minion,
  { payload }: PayloadAction<DealDamagePayload>
) => {
  const health = reduceHealth(state, payload.amount);

  state.destroyed = health <= 0;
  state.health = health;
};

// TODO: refactor
export default (state: Minion, action: PayloadAction<EntityPayload>) =>
  createReducer(state, {
    [dealDamage.type]: damageMinionHandler
  })(state, action);
