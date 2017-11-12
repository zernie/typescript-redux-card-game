import actionCreatorFactory from 'typescript-fsa';
import { upcastingReducer } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import {
  canSpendMana,
  Hero,
  PlayerKind,
  reduceArmor,
  reduceHealth,
} from '../Hero';
import { CharactersPayload, dealDamage } from './actions';
import { Character } from '../Character';

const actionCreator = actionCreatorFactory();

interface GainManaPayload {
  amount?: number;
  player: PlayerKind;
}

interface SpendManaPayload {
  amount: number;
  player: PlayerKind;
}

export const gainMana = actionCreator<GainManaPayload>('GAIN_MANA');
export const restoreMana = actionCreator<PlayerKind>('RESTORE_MANA');
export const spendMana = actionCreator<SpendManaPayload>('SPEND_MANA');

const maximumManaLens = R.lensProp<number, Hero>('maximumMana');
const manaLens = R.lensProp<number, Hero>('mana');

const gainManaHandler = (state: Hero, payload: GainManaPayload) =>
  R.when(
    () => payload.player === state.owner && state.maximumMana < 10,
    R.over(maximumManaLens, R.add(payload.amount || 1)),
    state
  );

const restoreManaHandler = (state: Hero, payload: PlayerKind) =>
  R.when(
    () => payload === state.owner,
    R.set(manaLens, R.view(maximumManaLens, state)),
    state
  );

const spendManaHandler = (state: Hero, payload: SpendManaPayload) =>
  R.when(
    () => payload.player === state.owner && canSpendMana(state, payload.amount),
    R.set(manaLens, state.mana - payload.amount),
    state
  );

const damageHeroHandler = (state: Hero, payload: CharactersPayload): Hero => {
  return R.when(
    () => payload.target.id === state.id,
    () =>
      R.merge(state, {
        armor: reduceArmor(state, payload.source.attack),
        health: reduceHealth(state, payload.source.attack),
      }),
    state
  );
};

export default upcastingReducer<Hero, Character>()
  .case(gainMana, gainManaHandler)
  .case(restoreMana, restoreManaHandler)
  .case(spendMana, spendManaHandler)
  .case(dealDamage, damageHeroHandler);
