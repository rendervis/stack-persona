import React, { Component } from "react";
import { connect } from "react-redux";

import Generation from "./Generation";
import Persona from "./Persona";
import { logout } from "../actions/account";

import { Button } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <div>
        <Button className="logout-button" onClick={this.props.logout}>
          Log Out
        </Button>
        <h2>Persona Stack from REACT!</h2>
        <Generation />
        <Persona />
      </div>
    );
  }
}

export default connect(null, { logout })(Home);
