import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import cardsReducer from './cardsReducer';
import boardReducer from './Board/boardReducer';

export default combineReducers({
  entities: boardReducer,
  cards: cardsReducer,
  state: gameStateReducer,
});
