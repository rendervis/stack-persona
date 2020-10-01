import { PERSONA } from "./types";
import { BACKEND } from "../config";

export const fetchPersona = () => (dispatch) => {
  dispatch({
    type: PERSONA.FETCH,
  });
  return fetch(`${BACKEND.ADDRESS}/persona/new`, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.type === "error") {
        dispatch({
          type: PERSONA.FETCH_ERROR,
          message: json.message,
        });
      } else {
        dispatch({
          type: PERSONA.FETCH_SUCCESS,
          persona: json.persona,
        });
      }
    })
    .catch((error) =>
      dispatch({
        type: PERSONA.FETCH_ERROR,
        message: error.message,
      })
    );
};
