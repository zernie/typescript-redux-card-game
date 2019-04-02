// import { createAction, createReducer } from 'redux-starter-kit';
import { createAction, createReducer } from 'redux-starter-kit/src';
// import * as _ from "lodash/fp";
import { reduceHealth } from "../../../Hero";
import { attackCharacter, dealDamage, DealDamagePayload } from "../actions";
import { Minion } from "../../../Minion";
import { Character } from "../../../Character";

const attackCharacterHandler = (char: Character) => char.attacksPerformed++;

const damageMinionHandler = (
  state: Minion,
  payload: DealDamagePayload
): Minion => {
  const health = reduceHealth(state, payload.amount);

  return { ...state, destroyed: health <= 0, health}
};

export default createReducer<Minion, Character>(undefined, {
  [attackCharacter]: attackCharacterHandler,
  [dealDamage]: damageMinionHandler
})
