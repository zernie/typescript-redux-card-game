import React from "react";
import * as ReactDOM from "react-dom";
import App from "./UI/App";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
// import { getPlayerHero } from "./Hero";
// import { gainMana, restoreMana } from './UI/Play/actions';
// import { Game, getBoard, getDeck, getHand } from '../Game';

const store = configureStore();
// TODO: refactor
// const playerID = getPlayerHero(store.getState() as Game);
// store.dispatch(gainMana({ id: playerID.id }));
// store.dispatch(restoreMana({ id: playerID.id }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
// registerServiceWorker();
