import { createReducer, Reducer } from "@reduxjs/toolkit";
import { Character, shouldExhaust } from "../../Character";
import { CardType } from "../../enums";
import { checkForEndGame } from "../gameStateReducer";
import { EntityContainer, EntityPayload } from "../../Entity";
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
import reduceReducers from "reduce-reducers";
import { getEntity, Handler } from "./utils";

type CharacterHandler<T = EntityPayload> = Handler<Character, T>;

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
  const attacker = game.play[payload.source.id] as Character;

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

const attackCharacterHandler: CharacterHandler = (state: Character) => {
  state.attacksPerformed++;
};

const exhaustHandler: CharacterHandler = (state: Character) => {
  state.exhausted = true;
};

const characterReducer =  createReducer<EntityContainer>({}, {
    [exhaust.type]: getEntity(exhaustHandler),
    [attackCharacter.type]: getEntity(attackCharacterHandler)
});

export default reduceReducers(characterReducer, minionReducer, heroReducer) as Reducer<EntityContainer>;
