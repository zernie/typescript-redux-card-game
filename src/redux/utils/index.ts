import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  Entity,
  EntityContainer,
  EntityPayload,
  Hero,
  Character,
  Player,
  Minion,
  HeroPower,
  Weapon
} from "../../models";

// TODO: refactor

export type Handler<S = Entity, P = EntityPayload> = (
  state: S,
  payload: PayloadAction<P>["payload"]
) => EntityContainer | void | undefined;

export type CharacterHandler<T = EntityPayload> = Handler<Character, T>;
export type PlayerHandler<T = EntityPayload> = Handler<Player, T>;
export type HeroHandler<T = EntityPayload> = Handler<Hero, T>;
export type MinionHandler<T = EntityPayload> = Handler<Minion, T>;
export type HeroPowerHandler<T = EntityPayload> = Handler<HeroPower, T>;
export type WeaponHandler<T = EntityPayload> = Handler<Weapon, T>;

export const getEntity = <
  E extends Entity = Entity,
  P extends EntityPayload = EntityPayload
>(
  handler: Handler<E, P>
): CaseReducer<EntityContainer, PayloadAction<P>> => (state, action) =>
  handler(state[action.payload.id] as E, action.payload);
