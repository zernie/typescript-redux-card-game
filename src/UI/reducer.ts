import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import boardReducer from './Board/boardReducer';
import deckReducer from './Deck/deckReducer';
import handReducer from './Hand/handReducer';

export default combineReducers({
  board: boardReducer,
  deck: deckReducer,
  hand: handReducer,
  state: gameStateReducer,
});
