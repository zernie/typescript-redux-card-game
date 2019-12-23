import reduceReducers from "reduce-reducers";
import { AnyAction } from "redux";
import { cards } from "./initialState";
import deckReducer from "./Deck/deckReducer";
import handReducer from "./Hand/handReducer";
import { CardContainer } from "../Card";
// import { createAction, createReducer } from "../../node_modules/@reduxjs/toolkit";
// import  { PayloadActionCreator}  from '@reduxjs/toolkit';
// import { createReducer } from '@reduxjs/toolkit/src/createReducer';

export default (
  state: CardContainer = cards,
  action: AnyAction
): CardContainer =>
  reduceReducers<CardContainer>(deckReducer, handReducer)(state, action);
