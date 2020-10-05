import { PUBLIC_PERSONAS } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_PUBLIC_PERSONAS = { personas: [] };

export default (state = DEFAULT_PUBLIC_PERSONAS, action) => {
  switch (action.type) {
    case PUBLIC_PERSONAS.FETCH:
      return {
        ...state,
        status: fetchStates.fetching,
      };
    case PUBLIC_PERSONAS.FETCH_ERROR:
      return {
        ...state,
        status: fetchStates.error,
        message: action.message,
      };
    case PUBLIC_PERSONAS.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        personas: action.personas,
      };
    default:
      return state;
  }
};
