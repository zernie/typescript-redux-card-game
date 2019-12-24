import { Action, PayloadAction } from "@reduxjs/toolkit";
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
    dealDamage({ id: payload.target.id, amount: payload.source.attack })
  );

  const game = getState();
  const attacker = getCharacter(payload.source.id, game);

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

const exhaustHandler = (state: Character, action: Action) => {
  state.exhausted = true;
};

// TODO: refactor
export default (
  state: Character,
  action: PayloadAction<EntityPayload>
): Character => {
  // FIXME
  // if (exhaust.match(action) || attackCharacter.match(action)) {
  //   return createReducer<Character>(null, {
  //       [exhaust]: exhaustHandler,
  //       [attackCharacter]: attackCharacterHandler
  //   })(state, action);
  // }

  // if (exhaust.match(action)) return produce(exhaustHandler(state, action));
  // if (attackCharacter.match(action)) return attackCharacterHandler(state, action);

  return state.type === CardType.Minion
    ? minionReducer(state, action)
    : heroReducer(state, action);
};
