import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { canSpendMana, Hero, PlayerKind } from '../Hero';
// import { characterReducer, dealDamage, exhaust } from './characterReducer';

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

export default (hero: Hero) =>
  reducerWithInitialState<Hero>(hero)
    .case(gainMana, gainManaHandler)
    .case(restoreMana, restoreManaHandler)
    .case(spendMana, spendManaHandler);
// .casesWithAction([attackCharacter, dealDamage, exhaust],  characterReducer);
