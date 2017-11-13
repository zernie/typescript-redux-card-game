import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { gainMana, restoreMana } from './heroReducer';
import { player } from './initialState';
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
// TODO: refactor
store.dispatch(gainMana({ id: player.id }));
store.dispatch(restoreMana({id: player.id}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
