import { combineReducers } from 'redux';
import { opponent, player } from './initialState';
import characterReducer from './characterReducer';
import gameStateReducer from './gameStateReducer';
import boardReducer from './boardReducer';
import deckReducer from './deckReducer';
import handReducer from './handReducer';

export default combineReducers({
  board: boardReducer,
  deck: deckReducer,
  hand: handReducer,
  player: characterReducer(player),
  opponent: characterReducer(opponent),
  state: gameStateReducer,
});
