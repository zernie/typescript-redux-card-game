import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash/fp";
import { processDeaths, summonMinion } from "./actions";
import { Minion, EntityContainer, CardType } from "../../../models";

const processDeathsHandler = (state: EntityContainer) =>
  _.omitBy(
    _.whereEq({ destroyed: true, type: CardType.Minion }),
    state
  ) as EntityContainer;

const summonMinionHandler = (
  state: EntityContainer,
  action: PayloadAction<Minion>
) => {
  state[action.payload.id] = action.payload;
};

export default createReducer<EntityContainer>(
  {},
  {
    [summonMinion.type]: summonMinionHandler,
    [processDeaths.type]: processDeathsHandler
  }
);
