import { ThunkAction } from 'redux-thunk';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import {
  Character,
  CharacterType,
  getCharacter,
  shouldExhaust,
} from '../../Character';
import { Game } from '../../Game';
import {
  attackCharacter,
  dealDamage,
  exhaust,
  SourceTargetPayload,
} from './actions';
import heroReducer, {
  equipWeapon,
  gainMana,
  restoreMana,
  spendMana,
} from './Hero/heroReducer';
import minionReducer from './Minion/minionReducer';
import { processDeaths } from './boardReducer';

// TODO: refactor
export const performAttack = (
  payload: SourceTargetPayload
): ThunkAction<void, Game, {}> => (dispatch, getState) => {
  dispatch(attackCharacter({ id: payload.source.id }));
  dispatch(dealDamage(payload));

  const attacker = getCharacter(payload.source.id, getState());

  if (payload.target.type === CharacterType.Minion) {
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
};

const exhaustHandler = R.assoc('exhausted', true);

export default reducerWithoutInitialState<Character>()
  .case(exhaust, exhaustHandler)
  .casesWithAction(
    [attackCharacter, dealDamage, equipWeapon, gainMana, restoreMana, spendMana],
    (state, action) =>
      state.type === CharacterType.Minion
        ? minionReducer(state, action)
        : heroReducer(state, action)
  );
