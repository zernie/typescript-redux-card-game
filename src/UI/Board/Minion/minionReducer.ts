import * as _ from "lodash/fp";
import { reduceHealth } from "../../../Hero";
import { DealDamagePayload } from "../actions";
import { Minion } from "../../../Minion";
import { Character } from "../../../Character";
import { createReducer } from "@reduxjs/toolkit";

const damageMinionHandler = (state: Minion, payload: DealDamagePayload) => {
  const health = reduceHealth(state, payload.amount);

  state.destroyed = health <= 0;
  state.health = health;
};

export default createReducer<Minion | null>(null, {
  dealDamage: damageMinionHandler
});
