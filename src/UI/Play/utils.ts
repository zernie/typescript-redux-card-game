import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Entity, EntityContainer, EntityPayload } from "../../Entity";
import { Hero } from "../../Hero";
import { Character } from "../../Character";
import { Player } from "../../Player";
import { Minion } from "../../Minion";

// TODO: refactor

export type Handler<S = Entity, P = EntityPayload> = (
  state: S,
  payload: PayloadAction<P>["payload"]
) => EntityContainer | void | undefined;

export type CharacterHandler<T = EntityPayload> = Handler<Character, T>;
export type HeroHandler<T = EntityPayload> = Handler<Hero, T>;
export type PlayerHandler<T> = Handler<Player, T>;
export type MinionHandler<T> = Handler<Minion, T>;

export const getEntity = <E extends Entity = Entity, P extends EntityPayload = EntityPayload>(handler: Handler<E, P>): CaseReducer<EntityContainer, PayloadAction<P>> => (
  state,
  action
) => handler(state[action.payload.id] as E, action.payload);
