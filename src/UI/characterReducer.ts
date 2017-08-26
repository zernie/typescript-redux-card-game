import * as R from 'ramda';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Minion } from '../Minion';
import { Player, PlayerKind } from '../Player';

const actionCreator = actionCreatorFactory();

export type AttackSource = Player | Minion;

interface AttackFacePayload {
  source: AttackSource;
  damage: number;
  target: Player;
}

interface AddManaPayload { amount: number; player: PlayerKind }

export const attackFace = actionCreator<AttackFacePayload>('ATTACK_FACE');
export const addMana = actionCreator<AddManaPayload>('ADD_MANA');
export const incTotalMana = actionCreator<{}>('INC_TOTAL_MANA');
export const restoreMana = actionCreator<{}>('RESTORE_MANA');
export const spendMana = actionCreator<number>('SPEND_MANA');

const healthLens = R.lensProp<number, Player>('health');
const totalManaLens = R.lensProp<number, Player>('totalMana');
const manaLens = R.lensProp<number, Player>('mana');

const attackFaceHandler = (state: Player, payload: AttackFacePayload) =>
  R.when(
    () => payload.target.kind === state.kind,
    () => R.set(healthLens, R.subtract(state.health, payload.damage), state),
    state
  );

const addManaHandler = (state: Player, payload: AddManaPayload) =>
  R.when(
    () => payload.player === state.kind,
    () => R.set(manaLens, R.add(state.totalMana, payload.amount), state),
    state
  );

const incTotalManaHandler = R.over(totalManaLens, R.inc);

const restoreManaHandler = (state: Player) =>
  R.set(manaLens, R.view(totalManaLens, state), state);

const spendManaHandler = (state: Player, payload: number) =>
  R.over(manaLens, R.subtract(payload), state);

export default (character: Player) =>
  reducerWithInitialState<Player>(character)
    .case(attackFace, attackFaceHandler)
    .case(addMana, addManaHandler)
    .case(incTotalMana, incTotalManaHandler)
    .case(restoreMana, restoreManaHandler)
    .case(spendMana, spendManaHandler);
