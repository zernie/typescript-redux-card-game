import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash/fp";
import { processDeaths, summonMinion } from "./actions";
import { Minion, EntityContainer, CardType } from "../../../models";

// refer https://github.com/HearthSim/SabberStone/blob/master/SabberStoneCore/src/Model/Game.cs#L1191
// TODO: maybe move to characterReducer?
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
