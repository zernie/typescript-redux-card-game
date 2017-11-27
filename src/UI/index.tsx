import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { gainMana, restoreMana } from './Board/Hero/actions';
import { getPlayer } from '../Hero';
import { Game } from '../Game';
// import { Game, getBoard, getDeck, getHand } from '../Game';
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
// TODO: refactor
const player = getPlayer(store.getState() as Game);
store.dispatch(gainMana({ id: player.id }));
store.dispatch(restoreMana({ id: player.id }));

// console.log(getHand(store.getState() as Game));
// console.log(getDeck(store.getState() as Game));
// console.log(getBoard(store.getState() as Game));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
