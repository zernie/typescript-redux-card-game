import { createReducer, PayloadAction, Reducer } from "@reduxjs/toolkit";
import _ from "lodash/fp";
import { Minion, minionsFromContainer } from "../../Minion";
import { play } from "../initialState";
import { nextTurn } from "../gameStateReducer";
import { CardType } from "../../enums";
import { Entity, EntityContainer, EntityPayload } from "../../Entity";
import { destroyWeapon, equipWeapon, EquipWeaponPayload, processDeaths, summonMinion } from "./actions";
import characterReducer from "./characterReducer";
import reduceReducers from "reduce-reducers";
import weaponsReducer from "./weaponReducer";
import playerReducer from "./playerReducer";
import weaponReducer from "./weaponReducer";

const destroyWeaponHandler = (
  state: EntityContainer,
  action: PayloadAction<EntityPayload>
) => {
  delete state[action.payload.id];
};

const equipWeaponHandler = (
  state: EntityContainer,
  action: PayloadAction<EquipWeaponPayload>
) => {
  state[action.payload.id] = action.payload.weapon;
};

const nextTurnHandler = (state: EntityContainer) => {
  const minions = minionsFromContainer(state);
  _.forEach(_.merge({ attacksPerformed: 0, exhausted: false }), minions);
};

const summonMinionHandler = (
  state: EntityContainer,
  action: PayloadAction<Minion>
) => {
  state[action.payload.id] = action.payload;
};

const processDeathsHandler = (state: EntityContainer) =>
  _.omitBy(_.whereEq({ destroyed: true, type: CardType.Minion }), state);

// const entityHandler = <T extends Entity> (reducer: Reducer<T>) => (
//   state: EntityContainer,
//   action: PayloadAction<EntityPayload>
// ): EntityContainer => {
//   return {...state, [action.payload.id]: reducer(
//     state[action.payload.id],
//     action
//   ) as T};
//   // state[action.payload.id] = reducer(
//   //   state[action.payload.id] as Character,
//   //   action
//   // );
// };

const chooseReducer = (entity: Entity): Reducer<Entity> => {switch (entity.type) {
  // case CardType.Minion:
  // case CardType.Hero:
  //   return characterReducer;
  case CardType.Player:
    return playerReducer;
  case CardType.Weapon:
    return weaponReducer;
}
throw new Error(`Unknown CardType "${entity.type}!"`)
};
// const REDUCER_MAPPINGS = {
//   // [CardType.Minion]: minionReducer,
//   // [CardType.Hero]: heroReducer,
//   [CardType.Minion]: characterReducer,
//   [CardType.Hero]: characterReducer,
//   [CardType.Weapon]: weaponsReducer
//;

const entityHandler = (
  state: EntityContainer,
  action: PayloadAction<EntityPayload>
): EntityContainer => {
  const entity = state[action.payload.id] as Entity;
  // const reducer = REDUCER_MAPPINGS[entity.type];
  const reducer = chooseReducer(entity);
  const result: Entity = reducer(
    state[action.payload.id],
    action
  );

  return { ...state, [action.payload.id]: result };
};
//&
// const characterHandler = entityHandler(characterReducer);
// const playerHandler = entityHandler(playerReducer);

// TODO: refactor
const entitiesReducer = createReducer<EntityContainer>(play, {
  [processDeaths.type]: processDeathsHandler,
  [destroyWeapon.type]: destroyWeaponHandler,
  [equipWeapon.type]: equipWeaponHandler,
  [nextTurn.type]: nextTurnHandler,
  [summonMinion.type]: summonMinionHandler
});

export default reduceReducers(entitiesReducer, characterReducer, playerReducer, weaponReducer);
// export default reduceReducers(entitiesReducer, entityHandler)
