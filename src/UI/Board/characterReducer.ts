import { ThunkAction } from 'redux-thunk';
import { Action, isType } from 'typescript-fsa';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Character, getCharacter, shouldExhaust } from '../../Character';
import { Game } from '../../Game';
import { CardType } from '../../enums';
import { checkForEndGame } from '../gameStateReducer';
import {
  attackCharacter,
  dealDamage,
  EntityPayload,
  exhaust,
  SourceTargetPayload,
} from './actions';
import { destroyWeapon } from './Hero/actions';
import minionReducer from './Minion/minionReducer';
import { processDeaths } from './boardReducer';
import heroReducer from './Hero/heroReducer';

// TODO: refactor
export const performAttack = (
  payload: SourceTargetPayload
): ThunkAction<void, Game, {}> => (dispatch, getState) => {
  dispatch(attackCharacter({ id: payload.source.id }));
  dispatch(
    dealDamage({ id: payload.target.id, amount: payload.source.attack })
  );

  const attacker = getCharacter(payload.source.id, getState());

  if (payload.target.type === CardType.Minion) {
    dispatch(
      dealDamage({
        id: attacker.id,
        amount: payload.target.attack,
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

const exhaustHandler = R.assoc<keyof Character, boolean>('exhausted', true);

export default (state: Character, action: Action<EntityPayload<Object>>) => {
  if (isType(action, exhaust)) {
    return reducerWithoutInitialState<Character>().case(
      exhaust,
      exhaustHandler
    )(state, action);
  }

  return state.type === CardType.Minion
    ? minionReducer(state, action)
    : heroReducer(state, action);
};
