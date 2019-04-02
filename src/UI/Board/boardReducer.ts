import * as _ from "lodash/fp";
// import { createAction, createReducer } from "../../node_modules/redux-starter-kit";
import { createAction, createReducer } from 'redux-starter-kit/src';
// import { Character } from "../../Character";
import { EntityContainer } from "../../Entity";
// import { CardType } from "../../enums";
import { Minion } from "../../Minion";
import { nextTurn } from "../gameStateReducer";
import { board } from "../initialState";
// import { attackCharacter, dealDamage, EntityPayload, exhaust } from "./actions";
// import characterReducer from "./characterReducer";
// import {
//   destroyWeapon,
//   equipWeapon,
//   gainMana,
//   restoreMana,
//   spendMana
// } from "./Hero/actions";

export const summonMinion = createAction<Minion>("SUMMON_MINION");
export const processDeaths = createAction<void>("PROCESS_DEATHS");

const nextTurnHandler = (state: EntityContainer): EntityContainer =>
  _.map(_.merge({ attacksPerformed: 0, exhausted: false }), state);

const summonMinionHandler = (
  state: EntityContainer,
  payload: Minion
): EntityContainer => _.assoc(payload.id, payload, state);

// const processDeathsHandler = _.reject<EntityContainer>(
//   _.whereEq({ destroyed: true, type: CardType.Minion })
// );

// TODO: refactor
// const characterHandler = (
//   state: EntityContainer,
//   action: Action<EntityPayload<Object>>
// ): EntityContainer =>
//   R.evolve(
//     {
//       [action.payload.id]: (character: Character) =>
//         characterReducer(character, action)
//     },
//     state
//   );

export default createReducer(board, {
  [nextTurn]: nextTurnHandler,
  [summonMinion]: summonMinionHandler
})
// .case(processDeaths, processDeathsHandler)
// TODO: we can give 4 elements maximum to casesWithAction method in order to make inference possible
// .casesWithAction(
//   [attackCharacter, dealDamage, exhaust, destroyWeapon],
//   characterHandler
// )
// .casesWithAction(
//   [equipWeapon, gainMana, restoreMana, spendMana],
//   characterHandler
// );
