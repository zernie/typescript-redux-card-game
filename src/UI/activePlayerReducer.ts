import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { PlayerKind, other } from '../Player';
import { nextTurn } from './turnReducer';

const activePlayerHandler: (state: PlayerKind) => PlayerKind = (
  state = PlayerKind.Player
) => other(state);

const activePlayerReducer = reducerWithInitialState<number>(0).case(
  nextTurn,
  activePlayerHandler
);

export default activePlayerReducer;
