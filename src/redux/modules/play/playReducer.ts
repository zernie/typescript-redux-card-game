import { Reducer } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import { EntityContainer } from "../../../types/Entity";
import characterReducer from "./characterReducer";
import playerReducer from "./playerReducer";
import weaponReducer from "./weaponReducer";

export default reduceReducers(playerReducer, characterReducer, weaponReducer) as Reducer<EntityContainer>;
