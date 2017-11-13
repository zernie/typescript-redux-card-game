import { ThunkAction } from 'redux-thunk';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import {
  Character,
  CharacterType,
  getCharacter,
  shouldExhaust,
} from '../Character';
import { Game } from '../Game';
import {
  attackCharacter,
  dealDamage,
  exhaust,
  SourceTargetPayload,
} from './actions';
import heroReducer, { gainMana, restoreMana, spendMana } from './heroReducer';
import minionReducer from './minionReducer';
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

const attackCharacterHandler = R.evolve({ attacksPerformed: R.inc });
const exhaustHandler = R.assoc('exhausted', true);

export default reducerWithoutInitialState<Character>()
  .case(attackCharacter, attackCharacterHandler)
  .case(exhaust, exhaustHandler)
  .casesWithAction(
    [dealDamage, gainMana, restoreMana, spendMana],
    (state, action) =>
      state.type === CharacterType.Minion
        ? minionReducer(state, action)
        : heroReducer(state, action)
  );
