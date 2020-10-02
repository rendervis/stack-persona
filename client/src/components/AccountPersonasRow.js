import React, { Component } from "react";
import PersonaAvatar from "./PersonaAvatar";

class AccountPersonasRow extends Component {
  render() {
    return (
      <div>
        <div>{this.props.persona.nickname}</div>
        <br />
        <PersonaAvatar persona={this.props.persona} />
      </div>
    );
  }
}

export default AccountPersonasRow;
