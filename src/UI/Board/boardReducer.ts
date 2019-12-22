import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash/fp';
import { Minion } from '../../Minion';
import { board } from '../initialState';
import { nextTurn } from '../gameStateReducer';
import { Character } from '../../Character';
import { CardType } from '../../enums';
import { EntityContainer, EntityPayload } from '../../Entity';
import { Player } from '../../Player';
import {
  attackCharacter,
  dealDamage,
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload,
  exhaust, gainMana,
  processDeaths, restoreMana, spendMana,
  summonMinion
} from './actions';
import characterReducer from './characterReducer';
import controllerReducer from './controllerReducer';


const destroyWeaponHandler = (state: EntityContainer, payload: EntityPayload) =>
  delete state[payload.id];

const equipWeaponHandler = (
  state: EntityContainer,
  action: PayloadAction<EquipWeaponPayload>
) => {
  state[action.payload.id] = action.payload.weapon;
};

const nextTurnHandler = (state: EntityContainer) => {
  return _.map(_.merge({ attacksPerformed: 0, exhausted: false }), state);
};

const summonMinionHandler = (
  state: EntityContainer,
  action: PayloadAction<Minion>
) => {
  state[action.payload.id] = action.payload;
};

const processDeathsHandler = _.reject(
  _.whereEq({ destroyed: true, type: CardType.Minion })
);

const characterHandler = (
  state: EntityContainer,
  action: PayloadAction<EntityPayload<Object>>
) => {
  state[action.payload.id] = characterReducer(
    state[action.payload.id] as Character,
    action
  );
};

const controllerHandler = (
  state: EntityContainer,
  action: PayloadAction<EntityPayload<Object>>
) => {
  state[action.payload.id] = controllerReducer(
    state[action.payload.id],
    action
  );
};

export default createReducer<EntityContainer>(board, {
    destroyWeapon: destroyWeaponHandler,
    equipWeapon: equipWeaponHandler,
    nextTurn: nextTurnHandler,
    summonMinion: summonMinionHandler,
    processDeaths: processDeathsHandler,
    attackCharacter: characterHandler,
    dealDamage: characterHandler,
    exhaust: characterHandler,
    equipWeapon: characterHandler,
    [gainMana]: characterHandler,
    [restoreMana]: characterHandler,
    [spendMana]: characterHandler,
    destroyWeapon: controllerHandler
  }
);
