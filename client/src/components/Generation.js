import React, { Component } from "react";

class Generation extends Component {
  generation = { generationId: 46, expiration: "2020-05-01" };
  render() {
    return (
      <div>
        <h3>Generation {this.generation.generationId}. Expires on:</h3>
        <h4>{new Date(this.generation.expiration).toString()}</h4>
      </div>
    );
  }
}

export default Generation;
