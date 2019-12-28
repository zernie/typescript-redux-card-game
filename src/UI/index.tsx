import React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "../redux/configureStore";
// import { getPlayerHero } from "./Hero";
// import { gainMana, restoreMana } from './UI/Play/actions';
// import { Game, getBoard, getDeck, getHand } from '../Game';

const store = configureStore();
// TODO: refactor
// const player = getPlayerHero(store.getState() as Game);
// store.dispatch(gainMana({ id: player.id }));
// store.dispatch(restoreMana({ id: player.id }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
// registerServiceWorker();
