import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./UI/App";
import { Provider } from "react-redux";
import configureStore from "./UI/configureStore";
import { getPlayerHero } from "./Hero";
import { Game } from "./Game";
// import boardReducer from 'UI/Board/boardReducer';
// import { Game, getBoard, getDeck, getHand } from '../Game';

const store = configureStore();
// TODO: refactor
// const player = getPlayerHero(store.getState() as Game);
// store.dispatch(boardReducer.actions.gainMana({ id: player.id }));
// store.dispatch(boardReducer.actions.restoreMana({ id: player.id }));

// console.log(getHand(store.getState() as Game));
// console.log(getDeck(store.getState() as Game));
// console.log(getBoard(store.getState() as Game));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
// registerServiceWorker();
