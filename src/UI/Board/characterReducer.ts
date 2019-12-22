import { ThunkAction } from "redux-thunk";
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import * as _ from "lodash/fp";
import { Character, getCharacter, shouldExhaust } from "../../Character";
import { Game } from "../../Game";
import { CardType } from "../../enums";
import { checkForEndGame } from "../gameStateReducer";
import {
  attackCharacter,
  dealDamage,
  exhaust,
  SourceTargetPayload
} from "./actions";
import minionReducer from "./Minion/minionReducer";
import { processDeaths } from "./actions";
import heroReducer from "./Hero/heroReducer";
import { EntityPayload } from '../../Entity';

// TODO: refactor
export const performAttack = (
  payload: SourceTargetPayload
): ThunkAction<void, Game, {}> => (dispatch, getState) => {
  dispatch(attackCharacter({ id: payload.source.id }));
  dispatch(
    dealDamage({ id: payload.target.id, amount: payload.source.attack })
  );

  const state = getState();
  const attacker = getCharacter(payload.source.id, state);

  if (payload.target.type === CardType.Minion) {
    dispatch(
      dealDamage({
        id: attacker.id,
        amount: payload.target.attack
      })
    );
  }
  //
  // // TODO: refactor
  // if (attacker.type === CardType.Hero && attacker.weapon) {
  //   const weapon = getWeapon(attacker.weapon, state);
  //   if (weapon.durability <= 0) {
  //     dispatch(destroyWeapon({ id: weapon.id }));
  //   }
  // }

  if (shouldExhaust(attacker)) {
    dispatch(exhaust({ id: attacker.id }));
  }

  dispatch(processDeaths());
  dispatch(checkForEndGame());
};

const attackCharacterHandler = (
  state: Character,
  action: PayloadAction<number>
) => {
  state.attacksPerformed += action.payload;
};

const exhaustHandler = (state: Character) => {
  state.exhausted = true;
};

// TODO: refactor
export default (
  state: Character,
  action: PayloadAction<EntityPayload<Object>>
) => {
  if (
    action.type === exhaust.type ||
    action.type === attackCharacter.type
  ) {
    return createReducer<Character|null>(null, {
        exhaust: exhaustHandler,
        attackCharacter: attackCharacterHandler
    })(state, action);
  }

  return state.type === CardType.Minion
    ? minionReducer(state, action)
    : heroReducer(state, action);
};
