// import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { board } from './initialState';
import Board from '../Board';
// import { board } from './initialState';

// const actionCreator = actionCreatorFactory();

// interface AttackFaceAction {
//   damage: number;
//   activePlayer: ActivePlayer;
//   target: ActivePlayer;
// }

// export const attackFace = actionCreator<AttackFaceAction>('ATTACK_FACE');
//
// const attackFaceHandler = (state: Player, payload: AttackFaceAction) =>
//   payload.target === payload.activePlayer
//     ? {
//     ...state,
//     health: state.health - payload.damage,
//   }
//     : state;

const boardReducer = reducerWithInitialState<Board>(board);

export default boardReducer;
