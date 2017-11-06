import * as R from 'ramda';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Minion } from '../Minion';
import { canSpendMana, Hero, PlayerKind, reduceArmor, reduceHealth } from '../Hero';
import { ThunkAction } from 'redux-thunk';

const actionCreator = actionCreatorFactory();

export type AttackSource = Hero | Minion;

interface AttackFacePayload {
  source: AttackSource;
  damage: number;
  player: PlayerKind;
}

interface AddManaPayload {
  amount: number;
  player: PlayerKind;
}

// TODO:
export const attackFace = (
  payload: AttackFacePayload
): ThunkAction<void, {}, {}> => dispatch => {
  dispatch(attackHero(payload));
};
export const attackHero = actionCreator<AttackFacePayload>('ATTACK_FACE');
export const addMana = actionCreator<AddManaPayload>('ADD_MANA');
export const incTotalMana = actionCreator('INC_TOTAL_MANA');
export const restoreMana = actionCreator('RESTORE_MANA');
export const spendMana = actionCreator<number>('SPEND_MANA');

const totalManaLens = R.lensProp<number, Hero>('maximumMana');
const manaLens = R.lensProp<number, Hero>('mana');

const attackHeroHandler = (state: Hero, payload: AttackFacePayload) =>
  R.when(
    () => payload.player === state.owner,
    () =>
      R.merge(
        state,
        {
          armor: reduceArmor(state, payload.damage),
          health: reduceHealth(state, payload.damage),
        }
      ),
    state
  );

const addManaHandler = (state: Hero, payload: AddManaPayload) =>
  R.when(
    () => payload.player === state.owner,
    R.set(manaLens, state.maximumMana + payload.amount),
    state
  );

const incTotalManaHandler = R.over(totalManaLens, R.inc);

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
    .case(incTotalMana, incTotalManaHandler)
    .case(restoreMana, restoreManaHandler)
    .case(spendMana, spendManaHandler);
