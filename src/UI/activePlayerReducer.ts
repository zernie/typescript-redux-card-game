import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ActivePlayer, other } from '../Player';
import { nextTurn } from './turnReducer';

const activePlayerHandler = (state: ActivePlayer = ActivePlayer.Player) => other(state);

const activePlayerReducer = reducerWithInitialState<number>(0).case(
  nextTurn,
  activePlayerHandler
);

export default activePlayerReducer;
