import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import initialState from "./initialState";
import { Game } from "../Game";

export default (() => configureStore<Game>({
  reducer: rootReducer,
  preloadedState: initialState
}));
