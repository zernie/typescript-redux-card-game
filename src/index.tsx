import React from "react";
import * as ReactDOM from "react-dom";
import App from "./UI/App";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

const store = configureStore();
// TODO: refactor

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
// registerServiceWorker();
