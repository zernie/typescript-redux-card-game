import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { gainMana, restoreMana } from './characterReducer';
import { PlayerKind } from '../Hero';

const store = configureStore();
const initialPlayer = PlayerKind.Player;
store.dispatch(gainMana({ player: initialPlayer }));
store.dispatch(restoreMana(initialPlayer));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
