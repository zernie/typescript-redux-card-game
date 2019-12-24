import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './UI/App';
import { Provider } from 'react-redux';
import configureStore from './UI/configureStore';
// import { getPlayerHero } from "./Hero";
import { Game, getBoard, getDeck, getHand } from './Game';
// import { gainMana, restoreMana } from './UI/Board/actions';
// import { Game, getBoard, getDeck, getHand } from '../Game';

const store = configureStore();
// TODO: refactor
// const player = getPlayerHero(store.getState() as Game);
// store.dispatch(gainMana({ id: player.id }));
// store.dispatch(restoreMana({ id: player.id }));

console.log("Hand", getHand(store.getState() as Game));
console.log("Deck", getDeck(store.getState() as Game));
console.log("Board", getBoard(store.getState() as Game));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
// registerServiceWorker();
