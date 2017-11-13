import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import boardReducer from './boardReducer';
import deckReducer from './deckReducer';
import handReducer from './handReducer';

export default combineReducers({
  board: boardReducer,
  deck: deckReducer,
  hand: handReducer,
  state: gameStateReducer,
});
