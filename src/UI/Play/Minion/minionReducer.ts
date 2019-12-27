import { createReducer, PayloadAction } from "@reduxjs/toolkit";
// import * as _ from "lodash/fp";
import { processDeaths, summonMinion } from "../actions";
import { Minion, minionsFromContainer } from "../../../Minion";
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

const summonMinionHandler = (
  state: EntityContainer,
  action: PayloadAction<Minion>,
) => {
  state[action.payload.id] = action.payload;
};

export default createReducer<EntityContainer>({}, {
  [summonMinion.type]: summonMinionHandler,
  [processDeaths.type]: processDeathsHandler,
  [nextTurn.type]: nextTurnHandler,
});
