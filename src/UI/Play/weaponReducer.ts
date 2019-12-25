// @ts-nocheck
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { EntityPayload } from "../../Entity";
import { Weapon } from "../../Weapon";
// TODO

export default (state: Weapon, action: PayloadAction<EntityPayload>) =>
  createReducer(state, {})(state, action);
