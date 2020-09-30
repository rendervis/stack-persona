import { ACCOUNT } from "./types";
import { BACKEND } from "../config";

export const signUpAction = ({ userName, password }) => (dispatch) => {
  dispatch({
    type: ACCOUNT.FETCH,
  });
  return fetch(`${BACKEND.ADDRESS}/account/signup`, {
    method: "POST",
    body: JSON.stringify({ userName, password }),
    headers: { "Content-Type": "application/json" },
    ///////store Session cookie on the browser
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      if (json.type === "error") {
        dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message });
      } else {
        dispatch({ type: ACCOUNT.FETCH_SUCCESS, ...json });
      }
    })
    .catch((error) => {
      dispatch({ type: ACCOUNT.FETCH_ERROR, message: error.message });
    });
};
