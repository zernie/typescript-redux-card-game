import { upcastingReducer } from "typescript-fsa-reducers";
import * as _ from "lodash/fp";
import { Hero, reduceArmor, reduceHealth } from "../../../Hero";
import { dealDamage, DealDamagePayload } from "../actions";
import { Character } from "../../../Character";

const damageHeroHandler = (state: Hero, payload: DealDamagePayload): Hero => {
  const health = reduceHealth(state, payload.amount);
  const destroyed = health <= 0;

  return _.merge(state, {
    armor: reduceArmor(state, payload.amount),
    destroyed,
    // playState: destroyed ? PlayState.Lost : state.playState,
    health: health
  });
};

export default upcastingReducer<Hero, Character>().case(
  dealDamage,
  damageHeroHandler
);
