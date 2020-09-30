import React, { Component } from "react";
import { connect } from "react-redux";

import Home from "./Home";
import AuthForm from "./AuthForm";

class Root extends Component {
  render() {
    const { loggedIn } = this.props.account;
    return loggedIn ? <Home /> : <AuthForm />;
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(mapStateToProps)(Root);
