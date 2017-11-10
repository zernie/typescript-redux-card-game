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

interface AddManaPayload {
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
export const addMana = actionCreator<AddManaPayload>('ADD_MANA');
export const gainMana = actionCreator('GAIN_MANA');
export const restoreMana = actionCreator('RESTORE_MANA');
export const spendMana = actionCreator<number>('SPEND_MANA');

const totalManaLens = R.lensProp<number, Hero>('maximumMana');
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

const addManaHandler = (state: Hero, payload: AddManaPayload) =>
  R.when(
    () => payload.player === state.owner,
    R.set(manaLens, state.maximumMana + payload.amount),
    state
  );

const gainManaHandler = (state: Hero, payload: AddManaPayload) =>
  R.when(() => state.maximumMana < 10, R.over(totalManaLens, R.inc), state);

const restoreManaHandler = (state: Hero) =>
  R.set(manaLens, R.view(totalManaLens, state), state);

const spendManaHandler = (state: Hero, payload: number) =>
  R.when(
    () => canSpendMana(state, payload),
    R.set(manaLens, state.mana - payload),
    state
  );

export default (character: Hero) =>
  reducerWithInitialState<Hero>(character)
    .case(addMana, addManaHandler)
    .case(dealDamage, dealDamageHandler)
    .case(gainMana, gainManaHandler)
    .case(restoreMana, restoreManaHandler)
    .case(spendMana, spendManaHandler);
