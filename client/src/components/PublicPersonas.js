import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPublicPersonas } from "../actions/publicPersonas";
import { Link } from "react-router-dom";
import PublicPersonasRow from "./PublicPersonasRow";

class PublicPersonas extends Component {
  componentDidMount() {
    this.props.fetchPublicPersonas();
  }
  render() {
    return (
      <div>
        <h3>Public Personas</h3>
        <Link to="/">Home</Link>
        {this.props.publicPersonas.personas.map((persona) => {
          return (
            <div key={persona.personaId}>
              <PublicPersonasRow persona={persona} />
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
    publicPersonas: state.publicPersonas,
  };
};
export default connect(mapStateToProps, { fetchPublicPersonas })(
  PublicPersonas
);
