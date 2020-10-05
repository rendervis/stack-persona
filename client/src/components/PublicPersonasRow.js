import React, { Component } from "react";
import PersonaAvatar from "./PersonaAvatar";

class PublicPersonasRow extends Component {
  render() {
    return (
      <div>
        <div>{this.props.persona.nickname}</div>
        <PersonaAvatar persona={this.props.persona} />
        <div>Sale value: {this.props.persona.saleValue}</div>
      </div>
    );
  }
}

export default PublicPersonasRow;
