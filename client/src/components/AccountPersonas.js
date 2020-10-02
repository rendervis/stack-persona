import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAccountPersonas } from "../actions/accountPersonas";

import AccountPersonasRow from "./AccountPersonasRow";

class AccountPersonas extends Component {
  componentDidMount() {
    this.props.fetchAccountPersonas();
  }

  render() {
    return (
      <div>
        <h3>Account Personas</h3>
        <Link to="/">Home</Link>

        {this.props.accountPersonas.personas.map((persona) => {
          return (
            <div key={persona.personaId}>
              <AccountPersonasRow persona={persona} />
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountPersonas: state.accountPersonas,
  };
};
export default connect(mapStateToProps, { fetchAccountPersonas })(
  AccountPersonas
);
