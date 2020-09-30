import React, { Component } from "react";
import Generation from "./Generation";
import Persona from "./Persona";

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Persona Stack from REACT!</h2>
        <Generation />
        <Persona />
      </div>
    );
  }
}

export default Home;
