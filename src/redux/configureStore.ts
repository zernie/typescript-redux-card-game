import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules/rootReducer";
import initialState from "./modules/initialState";
import { Game } from "../models/Game";

export default () =>
  configureStore<Game>({
    reducer: rootReducer,
    preloadedState: initialState
  });
