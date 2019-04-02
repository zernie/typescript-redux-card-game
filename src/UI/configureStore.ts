import { configureStore, getDefaultMiddleware } from 'redux-starter-kit/src/configureStore';
// import { configureStore, getDefaultMiddleware } from 'redux-starter-kit/src';
import rootReducer from "./reducer";
import initialState from "./initialState";
import { Game } from '../Game';
// import { applyMiddleware, createStore } from 'redux';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default () =>
//   createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(applyMiddleware(thunk))
//   );

//
export default configureStore<Game>({
  reducer: rootReducer,
  preloadedState: initialState,
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
}) ;
