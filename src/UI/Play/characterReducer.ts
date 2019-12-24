import { Action, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Character, getCharacter, shouldExhaust } from "../../Character";
import { CardType } from "../../enums";
import { checkForEndGame } from "../gameStateReducer";
import { EntityPayload } from "../../Entity";
import {
  attackCharacter,
  dealDamage,
  exhaust,
  processDeaths,
  SourceTargetPayload
} from "./actions";
import minionReducer from "./Minion/minionReducer";
import heroReducer from "./Hero/heroReducer";
import { AppThunk } from "../../utils";

// TODO: refactor
export const performAttack = (payload: SourceTargetPayload): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(attackCharacter({ id: payload.source.id }));
  dispatch(
    dealDamage({
      id: payload.target.id,
      amount: payload.source.attack,
      character: payload.target
    })
  );

  const game = getState();
  const attacker = getCharacter(payload.source.id, game);

  if (payload.target.type === CardType.Minion) {
    dispatch(
      dealDamage({
        id: attacker.id,
        amount: payload.target.attack,
        character: payload.target
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

const attackCharacterHandler = (state: Character) => {
  state.attacksPerformed++;
};

// FIXME
const exhaustHandler = (state: Character) => {
  state.exhausted = true;
};

// TODO: refactor
export default (
  state: Character,
  action: PayloadAction<EntityPayload>
): Character => {
  if (exhaust.match(action) || attackCharacter.match(action)) {
    return createReducer<Character>(state, {
      [exhaust.type]: exhaustHandler,
      [attackCharacter.type]: attackCharacterHandler
    })(state, action);
  }

  return state.type === CardType.Minion
    ? minionReducer(state, action)
    : heroReducer(state, action);
};
