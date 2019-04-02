// import { createAction } from "../../node_modules/redux-starter-kit";
import { createAction } from 'redux-starter-kit/src';
import { Character } from "../../Character";

export type EntityPayload<T = {}> = T & { id: number };

export type SourceTargetPayload = EntityPayload<{
  source: Character;
  target: Character;
}>;
export type DealDamagePayload = EntityPayload<{ amount: number }>;

export const attackCharacter = createAction<EntityPayload>("ATTACK_CHARACTER");
export const dealDamage = createAction<DealDamagePayload>("DEAL_DAMAGE");
export const exhaust = createAction<EntityPayload>("EXHAUST");
