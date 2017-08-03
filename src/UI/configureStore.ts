import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import initialState from './initialState';
import { compose } from 'redux';
import thunk from 'redux-thunk';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
