import { createAction, createReducer } from "@reduxjs/toolkit";
// import _ from 'lodash/fp';
import { Card, CardContainer } from "../../models";
import { EntityPayload, EntityPayloadAction } from "../utils";

export const drawCard = createAction<Card>("DRAW_CARD");
export const burnCard = createAction<EntityPayload>("BURN_CARD");

const drawCardHandler = (
  state: CardContainer,
  { payload }: EntityPayloadAction
) => {
  delete state[payload.id];
};

const burnCardHandler = (
  state: CardContainer,
  { payload }: EntityPayloadAction
) => {
  delete state[payload.id];
};

export default createReducer(
  {},
  {
    [drawCard.type]: drawCardHandler,
    [burnCard.type]: burnCardHandler
  }
);
