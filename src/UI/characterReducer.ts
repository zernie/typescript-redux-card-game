import * as R from 'ramda';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Minion } from '../Minion';
import { Player, PlayerKind } from '../Player';
import { ThunkAction } from 'redux-thunk';

const actionCreator = actionCreatorFactory();

export type AttackSource = Player | Minion;

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
export const attackFace = (payload: AttackFacePayload): ThunkAction<void, {}, {}> => dispatch => {
  dispatch(attackHero(payload));

};
export const attackHero = actionCreator<AttackFacePayload>('ATTACK_FACE');
export const addMana = actionCreator<AddManaPayload>('ADD_MANA');
export const incTotalMana = actionCreator('INC_TOTAL_MANA');
export const restoreMana = actionCreator('RESTORE_MANA');
export const spendMana = actionCreator<number>('SPEND_MANA');

const healthLens = R.lensProp<number, Player>('health');
const totalManaLens = R.lensProp<number, Player>('maximumMana');
const manaLens = R.lensProp<number, Player>('mana');

const attackHeroHandler = (state: Player, payload: AttackFacePayload) =>
  R.when(
    () => payload.player === state.owner,
    () => R.set(healthLens, state.health - payload.damage, state),
    state
  );

const addManaHandler = (state: Player, payload: AddManaPayload) =>
  R.when(
    () => payload.player === state.owner,
    () => R.set(manaLens, state.maximumMana + payload.amount, state),
    state
  );

const incTotalManaHandler = R.over(totalManaLens, R.inc);

const restoreManaHandler = (state: Player) =>
  R.set(manaLens, R.view(totalManaLens, state), state);

const spendManaHandler = (state: Player, payload: number) =>
  R.over(manaLens, R.subtract(payload), state);

export default (character: Player) =>
  reducerWithInitialState<Player>(character)
    .case(attackHero, attackHeroHandler)
    .case(addMana, addManaHandler)
    .case(incTotalMana, incTotalManaHandler)
    .case(restoreMana, restoreManaHandler)
    .case(spendMana, spendManaHandler);
