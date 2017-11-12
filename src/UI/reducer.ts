import { combineReducers } from 'redux';
import { opponent, player } from './initialState';
import gameStateReducer from './gameStateReducer';
import boardReducer from './boardReducer';
import deckReducer from './deckReducer';
import handReducer from './handReducer';
import characterReducer from './characterReducer';

export default combineReducers({
  board: boardReducer,
  deck: deckReducer,
  hand: handReducer,
  player: (state = player, action) => characterReducer(state, action),
  opponent: (state = opponent, action) => characterReducer(state, action),
  state: gameStateReducer,
});
