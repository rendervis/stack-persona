import { ACCOUNT_PERSONAS } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_ACCOUNT_PERSONAS = {
  personas: [],
};

export default (state = DEFAULT_ACCOUNT_PERSONAS, action) => {
  switch (action.type) {
    case ACCOUNT_PERSONAS.FETCH:
      return {
        ...state,
        status: fetchStates.fetching,
      };
    case ACCOUNT_PERSONAS.FETCH_ERROR:
      return {
        ...state,
        status: fetchStates.error,
        message: action.message,
      };
    case ACCOUNT_PERSONAS.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message,
        personas: action.personas,
      };
    default:
      return state;
  }
};
