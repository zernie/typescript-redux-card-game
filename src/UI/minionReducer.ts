import { reduceHealth } from '../Hero';
import { dealDamage, SourceTargetPayload } from './actions';
import { Minion } from '../Minion';
import { upcastingReducer } from 'typescript-fsa-reducers';
import { Character } from '../Character';
import * as R from 'ramda';

const damageMinionHandler = (
  state: Minion,
  payload: SourceTargetPayload
): Minion => {
  const health = reduceHealth(state, payload.source.attack);

  return R.merge(state, {
    destroyed: health <= 0,
    health: health,
  });
};

export default upcastingReducer<Minion, Character>().case(
  dealDamage,
  damageMinionHandler
);
