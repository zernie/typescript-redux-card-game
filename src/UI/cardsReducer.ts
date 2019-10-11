import reduceReducers from "reduce-reducers";
import { AnyAction } from "redux";
import { cards } from "./initialState";
import deckReducer from "./Deck/deckReducer";
import handReducer from "./Hand/handReducer";
import { CardContainer } from "../Card";
// import { createAction, createReducer } from "../../node_modules/redux-starter-kit";
// import  { PayloadActionCreator}  from 'redux-starter-kit';
// import { createReducer } from 'redux-starter-kit/src/createReducer';

export default (
  state: CardContainer = cards,
  action: AnyAction
): CardContainer =>
  reduceReducers<CardContainer>(deckReducer, handReducer)(state, action);
