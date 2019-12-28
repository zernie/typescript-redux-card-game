import gameStateReducer from "./gameStateReducer";
import deckReducer from "./deckReducer";
import handReducer from "./handReducer";
import playReducer from "./play/playReducer";
import graveyardReducer from "./graveyardReducer";
import secretReducer from "./secretReducer";
import setAsideReducer from "./setAsideReducer";

export default {
  deck: deckReducer,
  graveyard: graveyardReducer,
  hand: handReducer,
  play: playReducer,
  secret: secretReducer,
  setAside: setAsideReducer,
  state: gameStateReducer
};
