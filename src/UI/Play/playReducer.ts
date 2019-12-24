import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash/fp";
import { Minion, minionsFromContainer } from "../../Minion";
import { play } from "../initialState";
import { nextTurn } from "../gameStateReducer";
import { Character } from "../../Character";
import { CardType } from "../../enums";
import { EntityContainer, EntityPayload } from "../../Entity";
import { Player } from "../../Player";
import {
  attackCharacter,
  dealDamage,
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload,
  exhaust,
  gainMana,
  processDeaths,
  restoreMana,
  spendMana,
  summonMinion
} from "./actions";
import characterReducer from "./characterReducer";
import playersReducer from "./playersReducer";

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

const processDeathsHandler = (
  state: EntityContainer,
  action: PayloadAction<Minion>
) => _.reject(_.whereEq({ destroyed: true, type: CardType.Minion }), state);

const characterHandler = (
  state: EntityContainer,
  action: PayloadAction<EntityPayload>
) => {
  state[action.payload.id] = characterReducer(
    state[action.payload.id] as Character,
    action
  );
};

const controllerHandler = (
  state: EntityContainer,
  action: PayloadAction<EntityPayload>
) => {
  state[action.payload.id] = playersReducer(
    state[action.payload.id] as Player,
    action
  );
};

export default createReducer<EntityContainer>(play, {
  [processDeaths.type]: processDeathsHandler,
  [destroyWeapon.type]: destroyWeaponHandler,
  [equipWeapon.type]: equipWeaponHandler,
  [nextTurn.type]: nextTurnHandler,
  [summonMinion.type]: summonMinionHandler,
  [attackCharacter.type]: characterHandler,
  [dealDamage.type]: characterHandler,
  [exhaust.type]: characterHandler,
  [equipWeapon.type]: characterHandler,
  [gainMana.type]: characterHandler,
  [restoreMana.type]: characterHandler,
  [spendMana.type]: controllerHandler,
  [destroyWeapon.type]: controllerHandler
});
