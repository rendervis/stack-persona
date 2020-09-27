import React, { Component } from "react";

const DEFAULT_PERSONA = {
  personaId: "",
  generationId: "",
  nickname: "",
  birthdate: "",
  traits: [],
};
class Persona extends Component {
  state = {
    persona: DEFAULT_PERSONA,
  };

  componentDidMount() {
    this.fetchPersona();
  }

  fetchPersona = () => {
    fetch("http://localhost:3030/persona/new")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ persona: json.persona });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    const { generationId, personaId, traits } = this.state.persona;
    console.log(traits);
    return (
      <div>
        <span>P{generationId}.</span>
        <span>I{personaId}.</span>
        {traits.map((trait) => trait.traitValue).join(", ")}
      </div>
    );
  }
}

export default Persona;
