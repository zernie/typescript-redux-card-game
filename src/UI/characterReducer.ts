import { ThunkAction } from 'redux-thunk';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import {
  canSpendMana,
  Hero,
  PlayerKind,
  reduceArmor,
  reduceHealth,
} from '../Hero';
import { Character } from '../Character';
// import { exhaustMinion } from './boardReducer';
import { Game } from '../Game';

const actionCreator = actionCreatorFactory();

export interface AttackCharacterPayload {
  source: Character;
  target: Character;
}

interface GainManaPayload {
  amount?: number;
  player: PlayerKind;
}

interface SpendManaPayload {
  amount: number;
  player: PlayerKind;
}

// TODO: refactor
export const performAttack = (
  payload: AttackCharacterPayload
): ThunkAction<void, Game, {}> => dispatch => {
  dispatch(attackCharacter(payload));
  dispatch(dealDamage(payload));

  // if (shouldExhaust(payload.source)) {
  //   dispatch(exhaustMinion(payload.source));
  // }
};

export const attackCharacter = actionCreator<AttackCharacterPayload>(
  'ATTACK_CHARACTER'
);
export const dealDamage = actionCreator<AttackCharacterPayload>('DEAL_DAMAGE');
export const gainMana = actionCreator<GainManaPayload>('GAIN_MANA');
export const restoreMana = actionCreator<PlayerKind>('RESTORE_MANA');
export const spendMana = actionCreator<SpendManaPayload>('SPEND_MANA');

const maximumManaLens = R.lensProp<number, Hero>('maximumMana');
const manaLens = R.lensProp<number, Hero>('mana');

const dealDamageHandler = (state: Hero, payload: AttackCharacterPayload) =>
  R.when(
    () => payload.target.owner === state.owner,
    () =>
      R.merge(state, {
        armor: reduceArmor(state, payload.source.attack),
        health: reduceHealth(state, payload.source.attack),
      }),
    state
  );

const gainManaHandler = (state: Hero, payload: GainManaPayload) =>
  R.when(
    () => payload.player === state.owner && state.maximumMana < 10,
    R.over(maximumManaLens, R.add(payload.amount || 1)),
    state
  );

const restoreManaHandler = (state: Hero, payload: PlayerKind) =>
  R.when(
    () => payload === state.owner ,
    R.set(manaLens, R.view(maximumManaLens, state)),
    state
  );

const spendManaHandler = (state: Hero, payload: SpendManaPayload) =>
  R.when(
    () => payload.player === state.owner && canSpendMana(state, payload.amount),
    R.set(manaLens, state.mana - payload.amount),
    state
  );

export default (character: Hero) =>
  reducerWithInitialState<Hero>(character)
    .case(dealDamage, dealDamageHandler)
    .case(gainMana, gainManaHandler)
    .case(restoreMana, restoreManaHandler)
    .case(spendMana, spendManaHandler);
