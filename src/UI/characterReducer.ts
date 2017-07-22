import { Player } from '../Player';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { inc, evolve } from 'ramda';
import { nextTurn } from './turnReducer';
import { Minion } from '../Minion';

const actionCreator = actionCreatorFactory();

interface AttackFaceAction {
  source: Player | Minion;
  damage: number;
  target: Player;
}

export const attackFace = actionCreator<AttackFaceAction>('ATTACK_FACE');

// TODO: refactor
const attackFaceHandler = (state: Player, payload: AttackFaceAction) =>
  evolve<Player>(
    {
      health: () => state.health - payload.damage,
    },
    state
  );

const nextTurnHandler = evolve<Player>({
  totalMana: inc,
});

const characterReducer = (character: Player) =>
  reducerWithInitialState<Player>(character)
    .case(attackFace, attackFaceHandler)
    .case(nextTurn, nextTurnHandler);

export default characterReducer;
