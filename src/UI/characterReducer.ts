import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Minion } from '../Minion';
import { Player } from '../Player';
import { nextTurn } from './turnReducer';

const actionCreator = actionCreatorFactory();

export type AttackSource = Player | Minion;

interface AttackFaceAction {
  source: AttackSource;
  damage: number;
  target: Player;
}

export const attackFace = actionCreator<AttackFaceAction>('ATTACK_FACE');

// TODO: refactor
const attackFaceHandler = (state: Player, payload: AttackFaceAction) => ({
  ...state,
  health: state.health - payload.damage,
});

const nextTurnHandler = (state: Player) => ({
  ...state,
  totalMana: state.totalMana + 1,
  mana: state.totalMana + 1,
});

const characterReducer = (character: Player) =>
  reducerWithInitialState<Player>(character)
    .case(attackFace, attackFaceHandler)
    .case(nextTurn, nextTurnHandler);

export default characterReducer;
