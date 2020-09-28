import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import Generation from "./components/Generation";
import Persona from "./components/Persona";
import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

render(
  <Provider store={store}>
    <div>
      <h2>Persona Stack from REACT!</h2>
      <Generation />
      <Persona />
    </div>
  </Provider>,
  document.getElementById("root")
);
