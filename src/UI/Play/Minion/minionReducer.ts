import { createReducer, PayloadAction } from "@reduxjs/toolkit";
// import * as _ from "lodash/fp";
import { reduceHealth } from "../../../Hero";
import { dealDamage, DealDamagePayload, processDeaths, summonMinion } from "../actions";
import { Minion, minionsFromContainer } from "../../../Minion";
import { getEntity, Handler } from "../utils";
import { EntityContainer } from "../../../Entity";
import { CardType } from "../../../enums";
import _ from "lodash/fp";
import { nextTurn } from "../../gameStateReducer";

const nextTurnHandler = (state: EntityContainer) => {
  const minions = minionsFromContainer(state);
  _.forEach(_.merge({ attacksPerformed: 0, exhausted: false }), minions);
};

const processDeathsHandler = (state: EntityContainer) =>
  _.omitBy(_.whereEq({ destroyed: true, type: CardType.Minion }), state) as EntityContainer;

const damageMinionHandler: Handler<Minion, DealDamagePayload> = (
  state,
  payload
) => {
  const health = reduceHealth(state, payload.amount);

  state.destroyed = health <= 0;
  state.health = health;
};

const summonMinionHandler = (
  state: EntityContainer,
  action: PayloadAction<Minion>,
) => {
  state[action.payload.id] = action.payload;
};

export default createReducer<EntityContainer>({}, {
  [summonMinion.type]: summonMinionHandler,
    [dealDamage.type]: getEntity(damageMinionHandler),
  [processDeaths.type]: processDeathsHandler,
  [nextTurn.type]: nextTurnHandler,
});
