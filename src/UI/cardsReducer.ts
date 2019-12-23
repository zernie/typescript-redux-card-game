import { PayloadAction } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import { CardContainer } from "../Card";
import { cards } from "./initialState";
import deckReducer from "./Deck/deckReducer";
import handReducer from "./Hand/handReducer";
import { EntityPayload } from "../Entity";

export default (
  state: CardContainer = cards,
  action: PayloadAction<EntityPayload>
): CardContainer =>
  reduceReducers<CardContainer>(deckReducer, handReducer)(state, action);
