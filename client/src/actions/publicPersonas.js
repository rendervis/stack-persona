import { PUBLIC_PERSONAS } from "./types";
import { BACKEND } from "../config";

export const fetchPublicPersonas = () => (dispatch) => {
  dispatch({ type: PUBLIC_PERSONAS.FETCH });

  return fetch(`${BACKEND.ADDRESS}/personas/public-personas`)
    .then((response) => response.json())
    .then((json) => {
      if (json.type === "error") {
        dispatch({ type: PUBLIC_PERSONAS.FETCH_ERROR, message: json.message });
      } else {
        dispatch({
          type: PUBLIC_PERSONAS.FETCH_SUCCESS,
          personas: json.personas,
        });
      }
    })
    .catch((error) =>
      dispatch({ type: PUBLIC_PERSONAS.FETCH_ERROR, message: error.message })
    );
};
