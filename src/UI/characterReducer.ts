import Player, { ActivePlayer } from '../Player';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { inc, subtract, evolve } from 'ramda';
import { nextTurn } from './turnReducer';

const actionCreator = actionCreatorFactory();

interface AttackFaceAction {
  damage: number;
  activePlayer: ActivePlayer;
  target: ActivePlayer;
}

export const attackFace = actionCreator<AttackFaceAction>('ATTACK_FACE');

// TODO: refactor
const attackFaceHandler = (state: Player, payload: AttackFaceAction) =>
  evolve(
    {
      health: subtract(payload.damage),
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
