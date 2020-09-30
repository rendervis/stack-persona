import React, { Component } from "react";
import { connect } from "react-redux";

import fetchStates from "../reducers/fetchStates";
import { signUpAction } from "../actions/account";

import { Button, FormGroup, FormControl } from "react-bootstrap";

class AuthForm extends Component {
  state = {
    userName: "",
    password: "",
  };

  updateUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  updatePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  signUp = () => {
    const { userName, password } = this.state;
    this.props.signUpAction({ userName, password });
  };
  logIn = () => {
    console.log("this.state", this.state);
  };

  get Error() {
    if (this.props.account.status === fetchStates.error) {
      return <div>{this.props.account.message}</div>;
    }
  }
  render() {
    return (
      <div>
        <h2>STACK</h2>
        <FormGroup>
          <FormControl
            onChange={this.updateUserName}
            type="text"
            value={this.state.userName}
            placeholder="username"
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            onChange={this.updatePassword}
            type="password"
            value={this.state.password}
            placeholder="password"
          />
        </FormGroup>
        <div>
          <Button onClick={this.logIn}>Log In</Button>
          <span> </span>
          <Button onClick={this.signUp}>Sign Up</Button>
        </div>
        <br />
        {this.Error}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps, {
  signUpAction,
})(AuthForm);
