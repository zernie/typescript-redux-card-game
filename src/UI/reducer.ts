import { combineReducers } from 'redux';
import { opponent, player } from './initialState';
import { GameState } from '../Game';
import characterReducer from './characterReducer';
import turnReducer from './turnReducer';
import boardReducer from './boardReducer';
import deckReducer from './deckReducer';
import handReducer from './handReducer';
import activePlayerReducer from './activePlayerReducer';

export default combineReducers({
  board: boardReducer,
  deck: deckReducer,
  hand: handReducer,
  player: characterReducer(player),
  opponent: characterReducer(opponent),
  activePlayer: activePlayerReducer,
  turn: turnReducer,
  gameState: (state: number = GameState.Playing) => state,
});
