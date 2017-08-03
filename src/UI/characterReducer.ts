import * as R from 'ramda';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Minion } from '../Minion';
import { Player } from '../Player';
import { nextTurn } from './turnReducer';

const actionCreator = actionCreatorFactory();

export type AttackSource = Player | Minion;

interface AttackFacePayload {
  source: AttackSource;
  damage: number;
  target: Player;
}

export const attackFace = actionCreator<AttackFacePayload>('ATTACK_FACE');
export const addMana = actionCreator<number>('ADD_MANA');
export const incTotalMana = actionCreator<{}>('INC_TOTAL_MANA');
export const restoreMana = actionCreator<{}>('RESTORE_MANA');
export const spendMana = actionCreator<number>('SPEND_MANA');

// TODO: refactor
const attackFaceHandler = (state: Player, payload: AttackFacePayload) =>
  payload.target.kind !== state.kind
    ? state
    : R.evolve(
        {
          health: () => state.health - payload.damage,
        },
        state
      );

const totalManaLens = R.lensProp('totalMana');
const manaLens = R.lensProp('mana');

const addManaHandler = (state: Player, payload: number) =>
  R.over(manaLens, R.add(payload), state);

const incTotalManaHandler = R.over(totalManaLens, R.inc);

const restoreManaHandler = (state: Player) =>
  R.set(manaLens, R.view(totalManaLens, state), state);

const spendManaHandler = (state: Player, payload: number) =>
  R.over(manaLens, R.subtract(payload), state);

export const characterReducer = (character: Player) =>
  reducerWithInitialState<Player>(character)
    .case(attackFace, attackFaceHandler)
    .case(addMana, addManaHandler)
    .cases([incTotalMana, nextTurn], incTotalManaHandler)
    .cases([nextTurn, restoreMana], restoreManaHandler)
    .case(spendMana, spendManaHandler);
