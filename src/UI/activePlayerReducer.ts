import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { PlayerKind, other } from '../Player';
import { nextTurn } from './turnReducer';
import initialState from './initialState';

const activePlayerHandler: (state: PlayerKind) => PlayerKind = (
  state = PlayerKind.Player
) => other(state);

export default reducerWithInitialState<PlayerKind>(
  initialState.activePlayer
).case(nextTurn, activePlayerHandler);
