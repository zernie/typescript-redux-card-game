import { Reducer } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import { EntityContainer } from "../../../models";
import characterReducer from "./characterReducer";
import playerReducer from "./playerReducer";
import weaponReducer from "./weaponReducer";

export default reduceReducers(
  characterReducer,
  weaponReducer,
  playerReducer
) as Reducer<EntityContainer>;
