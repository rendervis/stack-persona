import { PERSONA } from "../actions/types";

import fetchStates from "./fetchStates";

const DEFAULT_PERSONA = {
  generationId: "",
  personaId: "",
  nickname: "",
  birthdate: "",
  traits: [],
};

export default (state = DEFAULT_PERSONA, action) => {
  switch (action.type) {
    case PERSONA.FETCH:
      return {
        ...state,
        status: fetchStates.fetching,
      };
    case PERSONA.FETCH_ERROR:
      return {
        ...state,
        status: fetchStates.error,
        message: action.message,
      };
    case PERSONA.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        ...action.persona,
      };
    default:
      return state;
  }
};
