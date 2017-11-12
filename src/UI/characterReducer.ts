import { ThunkAction } from 'redux-thunk';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Character, shouldExhaust } from '../Character';
import { Game } from '../Game';
import { getEntity } from '../EntityContainer';
import { Minion } from '../Minion';
import {
  attackCharacter,
  CharactersPayload,
  dealDamage,
  exhaust,
} from './actions';
import heroReducer, { gainMana, restoreMana, spendMana } from './heroReducer';
import minionReducer from './minionReducer';

// TODO: refactor
export const performAttack = (
  payload: CharactersPayload
): ThunkAction<void, Game, {}> => (dispatch, getState) => {
  dispatch(attackCharacter(payload));
  dispatch(dealDamage(payload));

  // TODO: refactor
  const attacker = getEntity<Minion>(payload.source.id, getState().board);

  if (shouldExhaust(attacker)) {
    dispatch(exhaust(payload));
  }
};

const attackCharacterHandler = (
  state: Character,
  payload: CharactersPayload
): Character =>
  payload.source.id === state.id
    ? R.evolve({ attacksPerformed: R.inc }, state)
    : state;

const exhaustHandler = (
  state: Character,
  payload: CharactersPayload
): Character =>
  payload.source.id === state.id ? R.assoc('exhausted', true, state) : state;

export default reducerWithoutInitialState<Character>()
  .case(attackCharacter, attackCharacterHandler)
  // .case(dealDamage, dealDamageHandler)
  .case(exhaust, exhaustHandler)
  .casesWithAction(
    [dealDamage, gainMana, restoreMana, spendMana],
    (state, action) => {
      if (state.type !== 'hero') {
        return state;
      }

      return heroReducer(state, action);
    }
  )
  .casesWithAction([dealDamage], (state, action) => {
    if (state.type !== 'minion') {
      return state;
    }

    return minionReducer(state, action);
  });
