import { combineReducers } from 'redux';
import { opponent, player } from './initialState';
import heroReducer from './heroReducer';
import gameStateReducer from './gameStateReducer';
import boardReducer from './boardReducer';
import deckReducer from './deckReducer';
import handReducer from './handReducer';

export default combineReducers({
  board: boardReducer,
  deck: deckReducer,
  hand: handReducer,
  player: heroReducer(player),
  opponent: heroReducer(opponent),
  state: gameStateReducer,
});
