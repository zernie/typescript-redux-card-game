import { ThunkAction } from 'redux-thunk';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { reduceHealth } from '../Hero';
import { Character, shouldExhaust } from '../Character';
import { Game } from '../Game';
import { getEntity } from '../EntityContainer';

const actionCreator = actionCreatorFactory();

export interface CharactersPayload {
  source: Character;
  target: Character;
}

// TODO: refactor
export const performAttack = (
  payload: CharactersPayload
): ThunkAction<void, Game, {}> => (dispatch, getState) => {
  dispatch(attackCharacter(payload));
  dispatch(dealDamage(payload));

  // TODO: refactor
  const minion = getEntity<Character>(payload.source.id, getState().board);

  if (shouldExhaust(minion)) {
    dispatch(exhaust(payload));
  }
};

export const attackCharacter = actionCreator<CharactersPayload>(
  'ATTACK_CHARACTER'
);
export const dealDamage = actionCreator<CharactersPayload>('DEAL_DAMAGE');
export const exhaust = actionCreator<CharactersPayload>('EXHAUST');

const attackCharacterHandler = (
  state: Character,
  payload: CharactersPayload
): Character => R.evolve({ attacksPerformed: R.inc }, state);

const dealDamageHandler = (state: Character, payload: CharactersPayload) =>
  R.when(
    () => payload.target.owner === state.owner,
    () =>
      R.merge(state, {
        health: reduceHealth(state, payload.source.attack),
      }),
    state
  );

const exhaustHandler = R.assoc('exhausted', true);

export default reducerWithoutInitialState<Character>()
  .case(attackCharacter, attackCharacterHandler)
  .case(dealDamage, dealDamageHandler)
  .case(exhaust, exhaustHandler);
