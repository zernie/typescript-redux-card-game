import { createStore } from 'redux';
import rootReducer from './reducer';
// import { ProviderProps } from 'react-redux';

const initialState = {};

export default () =>
  createStore(
    rootReducer,
    initialState,
    window['__REDUX_DEVTOOLS_EXTENSION__'] &&
      window['__REDUX_DEVTOOLS_EXTENSION__']()
  );
