import { combineReducers } from 'redux';
import { opponent, player } from './initialState';
import { GameState } from '../Game';
import characterReducer from './characterReducer';
import { ActivePlayer } from '../Player';
import turnReducer from './turnReducer';

const playerReducer = characterReducer;
const opponentReducer = characterReducer;

export default combineReducers({
  player: playerReducer(player),
  opponent: opponentReducer(opponent),
  activePlayer: (state: ActivePlayer = ActivePlayer.Player) => state,
  turn: turnReducer,
  gameState: (state: number = GameState.Playing) => state,
});
