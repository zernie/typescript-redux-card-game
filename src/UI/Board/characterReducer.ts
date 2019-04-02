import * as _ from "lodash/fp";
import { ThunkAction } from "redux-thunk";
// import { createAction, createReducer } from "../../node_modules/redux-starter-kit";
import { createAction, createReducer } from 'redux-starter-kit/src';
import { Character, getCharacter, shouldExhaust } from "../../Character";
import { CardType } from "../../enums";
import { Game } from "../../Game";
import { checkForEndGame } from "../gameStateReducer";
import {
  attackCharacter,
  dealDamage,
  EntityPayload,
  exhaust,
  SourceTargetPayload
} from "./actions";
import { processDeaths } from "./boardReducer";
import { destroyWeapon } from "./Hero/actions";
import heroReducer from "./Hero/heroReducer";
import minionReducer from "./Minion/minionReducer";
import { ActionCreator } from 'redux';

// TODO: refactor
export const performAttack = (
  payload: SourceTargetPayload
): ThunkAction<void, Game, {}, ActionCreator<EntityPayload>> => (dispatch, getState) => {
  dispatch(attackCharacter({ id: payload.source.id }));
  dispatch(
    dealDamage({ id: payload.target.id, amount: payload.source.attack })
  );

  const attacker = getCharacter(payload.source.id, getState());

  if (payload.target.type === CardType.Minion) {
    dispatch(
      dealDamage({
        amount: payload.target.attack,
        id: attacker.id,
      })
    );
  }

  // TODO: refactor
  if (
    attacker.type === CardType.Hero &&
    attacker.weapon &&
    attacker.weapon.durability <= 0
  ) {
    dispatch(destroyWeapon({ id: attacker.id }));
  }

  if (shouldExhaust(attacker)) {
    dispatch(exhaust({ id: attacker.id }));
  }

  dispatch(processDeaths());
  dispatch(checkForEndGame());
};

// const exhaustHandler = _.assoc<keyof Character, boolean>("exhausted", true);
const exhaustHandler = _.assoc("exhausted", true);

export default (state: Character, action: Action<EntityPayload<Object>>) => {
  // if (action.type === exhaust) {
  //   return reducerWithoutInitialState<Character>().case(
  //     exhaust,
  //     exhaustHandler
  //   )(state, action);
  // }

  return state.type === CardType.Minion
    ? minionReducer(state, action)
    : heroReducer(state, action);
};
