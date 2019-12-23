import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
// import _ from 'lodash/fp';
import { CardContainer } from "../../Card";
import { Zone } from "../../enums";
import { EntityPayload } from "../../Entity";

export const drawCard = createAction<EntityPayload>("DRAW_CARD");

const drawCardHandler = (
  state: CardContainer,
  action: PayloadAction<EntityPayload>
) => {
  // ): CardContainer => { state[action.payload].zone = Zone.Hand };
  state[action.payload.id].zone = Zone.Hand;
};

export default  createReducer({}, {
    [drawCard.type]: drawCardHandler
  })
