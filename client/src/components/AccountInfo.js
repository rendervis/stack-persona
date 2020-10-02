import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchAccountInfo } from "../actions/accountInfo";

class AccountInfo extends Component {
  componentDidMount() {
    this.props.fetchAccountInfo();
  }

  render() {
    return (
      <div>
        <h3>Account Info</h3>
        <div>Username: {this.props.accountInfo.userName}</div>
        <div>Balance: {this.props.accountInfo.balance}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountInfo: state.accountInfo,
  };
};
export default connect(mapStateToProps, {
  fetchAccountInfo,
})(AccountInfo);
