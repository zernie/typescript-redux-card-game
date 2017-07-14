import Player, { ActivePlayer } from '../Player';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

const actionCreator = actionCreatorFactory();

interface AttackFaceAction {
  damage: number;
  activePlayer: ActivePlayer;
  target: ActivePlayer;
}

export const attackFace = actionCreator<AttackFaceAction>('ATTACK_FACE');

const attackFaceHandler = (state: Player, payload: AttackFaceAction) =>
  payload.target === payload.activePlayer
    ? {
    ...state,
    health: state.health - payload.damage,
  }
    : state;

const characterReducer = (character: Player) =>
  reducerWithInitialState<Player>(character).case(
    attackFace,
    attackFaceHandler
  );

export default characterReducer;
