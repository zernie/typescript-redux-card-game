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
import {  Game } from '../Game';

const actionCreator = actionCreatorFactory();

export interface AttackFacePayload {
  source: Character;
  damage: number;
  player: PlayerKind;
}

interface AddManaPayload {
  amount: number;
  player: PlayerKind;
}

// TODO: refactor
export const attackFace = (
  payload: AttackFacePayload
): ThunkAction<void, Game, {}> => (dispatch, getState) => {
  dispatch(attackHero(payload));
  // const hero = currentPlayer(getState());

  // if (!canAttack(hero)) {
  //   dispatch(exhaustMinion(payload.source));
  // }
};

export const attackHero = actionCreator<AttackFacePayload>('ATTACK_FACE');
export const addMana = actionCreator<AddManaPayload>('ADD_MANA');
export const gainMana = actionCreator('GAIN_MANA');
export const restoreMana = actionCreator('RESTORE_MANA');
export const spendMana = actionCreator<number>('SPEND_MANA');

const totalManaLens = R.lensProp<number, Hero>('maximumMana');
const manaLens = R.lensProp<number, Hero>('mana');

const attackHeroHandler = (state: Hero, payload: AttackFacePayload) =>
  R.when(
    () => payload.player === state.owner,
    () =>
      R.merge(state, {
        armor: reduceArmor(state, payload.damage),
        health: reduceHealth(state, payload.damage),
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
    .case(attackHero, attackHeroHandler)
    .case(addMana, addManaHandler)
    .case(gainMana, gainManaHandler)
    .case(restoreMana, restoreManaHandler)
    .case(spendMana, spendManaHandler);
