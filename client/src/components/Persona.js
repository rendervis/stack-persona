import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchPersona } from "../actions/persona";

import { Button } from "react-bootstrap";
import PersonaAvatar from "./PersonaAvatar";

class Persona extends Component {
  // componentDidMount() {
  //   this.fetchPersona();
  // }

  // fetchPersona = () => {
  //   fetch("http://localhost:3030/persona/new")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       this.setState({ persona: json.persona });
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  render() {
    const { generationId, personaId, traits } = this.props.persona;
    // console.log(traits);
    return (
      <div>
        <span>P{generationId}.</span>
        <span>I{personaId}.</span>
        {traits.map((trait) => trait.traitValue).join(", ")}
        <br />
        <Button onClick={this.props.fetchPersona}>New Persona</Button>
        <br />
        <PersonaAvatar persona={this.props.persona} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    persona: state.persona,
  };
};
export default connect(mapStateToProps, { fetchPersona })(Persona);
