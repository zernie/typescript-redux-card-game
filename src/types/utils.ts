// import _ from "lodash/fp";
import { ThunkAction } from "redux-thunk";
import { Game } from "./Game";
import { Action } from "redux";

let _lastId = 0;
export const newId = (): number => new Date().getTime() + _lastId++;

export type AppThunk = ThunkAction<void, Game, null, Action<string>>;
