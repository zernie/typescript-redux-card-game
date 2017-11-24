import { ThunkAction } from 'redux-thunk';
import { Action } from 'typescript-fsa';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Character, getCharacter, shouldExhaust } from '../../Character';
import { Game } from '../../Game';
import { CardType } from '../../enums';
import {
  attackCharacter,
  CharacterPayload,
  dealDamage,
  exhaust,
  SourceTargetPayload,
} from './actions';
import { equipWeapon, gainMana, restoreMana, spendMana } from './Hero/actions';
import minionReducer from './Minion/minionReducer';
import { processDeaths } from './boardReducer';
import heroReducer from './Hero/heroReducer';
import { checkForEndGame } from '../gameStateReducer';

// TODO: refactor
export const performAttack = (
  payload: SourceTargetPayload
): ThunkAction<void, Game, {}> => (dispatch, getState) => {
  dispatch(attackCharacter({ id: payload.source.id }));
  dispatch(dealDamage(payload));

  const attacker = getCharacter(payload.source.id, getState());

  if (payload.target.type === CardType.Minion) {
    dispatch(
      dealDamage({
        id: attacker.id,
        source: payload.target,
        target: attacker,
      })
    );
  }

  if (shouldExhaust(attacker)) {
    dispatch(exhaust({ id: attacker, ...attacker }));
  }

  dispatch(processDeaths());
  dispatch(checkForEndGame());
};

const exhaustHandler = R.assoc('exhausted', true);

const chooseReducer = (
  state: Character,
  action: Action<CharacterPayload<Object>>
) =>
  state.type === CardType.Minion
    ? minionReducer(state, action)
    : heroReducer(state, action);

export default reducerWithoutInitialState<Character>()
  .case(exhaust, exhaustHandler)
  .casesWithAction([attackCharacter, dealDamage], chooseReducer)
  .casesWithAction(
    [equipWeapon, gainMana, restoreMana, spendMana],
    chooseReducer
  );
