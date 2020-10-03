import React, { Component } from "react";
import PersonaAvatar from "./PersonaAvatar";
import { BACKEND } from "../config";

import { Button } from "react-bootstrap";

class AccountPersonasRow extends Component {
  state = {
    nickname: this.props.persona.nickname,
    isPublic: this.props.persona.isPublic,
    saleValue: this.props.persona.saleValue,
    edit: false,
  };

  updateNickName = (event) => {
    this.setState({ nickname: event.target.value });
  };
  updateSaleValue = (event) => {
    this.setState({ saleValue: event.target.value });
  };
  updateIsPublic = (event) => {
    this.setState({ isPublic: event.target.checked });
  };
  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };
  save = () => {
    fetch(`${BACKEND.ADDRESS}/persona/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personaId: this.props.persona.personaId,
        nickname: this.state.nickname,
        isPublic: this.state.isPublic,
        saleValue: this.state.saleValue,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.type === "error") {
          alert(json.message);
        } else {
          this.toggleEdit();
        }
      })
      .catch((error) => alert(error.message));
  };
  get SaveButton() {
    return <Button onClick={this.save}>Save</Button>;
  }
  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit</Button>;
  }

  render() {
    return (
      <div>
        <div>{this.state.nickname}</div>
        <input
          type="text"
          value={this.state.nickname}
          onChange={this.updateNickName}
          disabled={!this.state.edit}
        />
        <br />
        <div>
          <span>
            Sale value:{" "}
            <input
              onChange={this.updateSaleValue}
              type="number"
              disabled={!this.state.edit}
              value={this.state.saleValue}
            />
          </span>{" "}
          <span>
            Public:{" "}
            <input
              onChange={this.updateIsPublic}
              type="checkbox"
              disabled={!this.state.edit}
              checked={this.state.isPublic}
            />
          </span>
          {this.state.edit ? this.SaveButton : this.EditButton}
        </div>
        <br />
        <PersonaAvatar persona={this.props.persona} />
      </div>
    );
  }
}

export default AccountPersonasRow;
