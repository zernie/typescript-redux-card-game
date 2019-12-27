import { CaseReducer, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { Entity, EntityContainer, EntityPayload } from "../../Entity";

// TODO: refactor

export type Handler<S =Entity, P =EntityPayload> = (
  state: S,
  action: PayloadAction<P>["payload"]
) => EntityContainer | void | undefined;

export const getEntity = <E extends Entity = Entity, P extends EntityPayload = EntityPayload>(handler: Handler<E, P>): CaseReducer<EntityContainer, PayloadAction<P>> => (
  state,
  action
) => handler(state[action.payload.id] as E, action.payload);
