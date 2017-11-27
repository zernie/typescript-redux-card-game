import * as R from 'ramda';
import { upcastingReducer } from 'typescript-fsa-reducers';
import { reduceHealth } from '../../../Hero';
import { attackCharacter, dealDamage, DealDamagePayload } from '../actions';
import { Minion } from '../../../Minion';
import { Character } from '../../../Character';

const attackCharacterHandler = R.evolve({ attacksPerformed: R.inc });

const damageMinionHandler = (
  state: Minion,
  payload: DealDamagePayload
): Minion => {
  const health = reduceHealth(state, payload.amount);

  return R.merge(state, {
    destroyed: health <= 0,
    health: health,
  });
};

export default upcastingReducer<Minion, Character>()
  .case(attackCharacter, attackCharacterHandler)
  .case(dealDamage, damageMinionHandler);
