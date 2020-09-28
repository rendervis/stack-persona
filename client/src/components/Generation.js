import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchGeneration } from "../actions/generation";
import fetchStates from "../reducers/fetchStates";

const MINIMUM_DELAY = 3000;

class Generation extends Component {
  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // fetchGeneration = () => {
  //   fetch("http://localhost:3030/generation")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.props.generationActionCreator(json.generation);
  //     })
  //     .catch((error) => console.error("error", error));
  // };
  fetchNextGeneration = () => {
    this.props.fetchGeneration();
    let delay =
      new Date(this.props.generation.expiration).getTime() -
      new Date().getTime();

    if (delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY;
    }

    this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
  };

  render() {
    const { generation } = this.props;

    // if (generation.status === fetchStates.fetching) {
    //   return <div>...Loading</div>;
    // }
    if (generation.status === fetchStates.error) {
      return <div>{generation.message}</div>;
    }
    return (
      <div>
        <h3>Generation {generation.generationId}. Expires on:</h3>
        <h4>{new Date(generation.expiration).toString()}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const generation = state.generation;
  return { generation };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchGeneration: () => fetchGeneration(dispatch),
//   };
// };

export default connect(mapStateToProps, { fetchGeneration })(Generation);
