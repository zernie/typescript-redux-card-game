import { reduceHealth } from '../Hero';
import { CharactersPayload, dealDamage } from './actions';
import { Minion } from '../Minion';
import { upcastingReducer } from 'typescript-fsa-reducers';
import { Character } from '../Character';
import * as R from 'ramda';

const damageMinionHandler = (
  state: Minion,
  payload: CharactersPayload
): Minion =>
  R.when(
    () => payload.target.id === state.id,
    () =>
      R.merge(state, {
        health: reduceHealth(state, payload.source.attack),
      }),
    state
  );

export default upcastingReducer<Minion, Character>().case(
  dealDamage,
  damageMinionHandler
);
