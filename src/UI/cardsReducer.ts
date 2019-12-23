import reduceReducers from "reduce-reducers";
import { AnyAction } from "redux";
import { CardContainer } from "../Card";
import { cards } from "./initialState";
import deckReducer from "./Deck/deckReducer";
import handReducer from "./Hand/handReducer";
// import { createAction, createReducer, PayloadActionCreator} from "../../node_modules/@reduxjs/toolkit";

export default (
  state: CardContainer = cards,
  action: AnyAction
): CardContainer =>
  reduceReducers<CardContainer>(deckReducer, handReducer)(state, action);
