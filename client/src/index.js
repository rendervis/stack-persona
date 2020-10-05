import React from "react";
import { render } from "react-dom";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import Root from "./components/Root";
import AccountPersonas from "./components/AccountPersonas";
import PublicPersonas from "./components/PublicPersonas";
import { fetchAuthenticated } from "./actions/account";
import "./index.css";

import { fetchPublicPersonas } from "./actions/publicPersonas";

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// const RedirectToAccountPersonas = () => {
//   return <Redirect to={{ pathname: "/account-personas" }} />;
// };
store.dispatch(fetchPublicPersonas());
const AuthRoute = (props) => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  const { component, path } = props;
  return <Route path={path} component={component} />;
};

store.dispatch(fetchAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Root} />
          <AuthRoute
            exact
            path="/account-personas"
            component={AccountPersonas}
          />
          <AuthRoute path="/public-personas" component={PublicPersonas} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
