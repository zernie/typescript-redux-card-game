import { createStore } from 'redux';
import rootReducer from './reducer';
import initialState from './initialState';

declare const window: Window & { __REDUX_DEVTOOLS_EXTENSION__: Function };

export default () =>
  createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
