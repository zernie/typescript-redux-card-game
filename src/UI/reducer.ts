import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import deckReducer from './Deck/deckReducer';
import handReducer from './Hand/handReducer';
import playReducer from './Play/playReducer';
import graveyardReducer from './Graveyard/graveyardReducer';
import secretReducer from './Secret/secretReducer';
import setAsideReducer from './SetAside/setAsideReducer';

export default combineReducers({
  deck: deckReducer,
  graveyard: graveyardReducer,
  hand: handReducer,
  play: playReducer,
  secret: secretReducer,
  setAside: setAsideReducer,
  state: gameStateReducer,
});
