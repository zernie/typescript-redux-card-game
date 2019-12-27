import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
// import _ from 'lodash/fp';
import { Card, CardContainer } from "../../Card";
import { EntityPayload } from "../../Entity";

export const drawCard = createAction<Card>("DRAW_CARD");

const drawCardHandler = (
  state: CardContainer,
  action: PayloadAction<EntityPayload>
) => {
  delete state[action.payload.id];
};

export default createReducer(
  {},
  {
    [drawCard.type]: drawCardHandler
  }
);
