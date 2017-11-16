import { reduceHealth } from '../../../Hero';
import { attackCharacter, dealDamage, SourceTargetPayload } from '../actions';
import { Minion } from '../../../Minion';
import { upcastingReducer } from 'typescript-fsa-reducers';
import { Character } from '../../../Character';
import * as R from 'ramda';

const attackCharacterHandler = R.evolve({ attacksPerformed: R.inc });

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

export default upcastingReducer<Minion, Character>()
  .case(attackCharacter, attackCharacterHandler)
  .case(dealDamage, damageMinionHandler);
