import { ACCOUNT } from "./types";
import { BACKEND } from "../config";

const fetchFromAccount = ({ endpoint, options, SUCCESS_TYPE }) => (
  dispatch
) => {
  dispatch({
    type: ACCOUNT.FETCH,
  });
  return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      if (json.type === "error") {
        dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message });
      } else {
        dispatch({ type: SUCCESS_TYPE, ...json });
      }
    })
    .catch((error) => {
      dispatch({ type: ACCOUNT.FETCH_ERROR, message: error.message });
    });
};

export const signUpAction = ({ userName, password }) =>
  fetchFromAccount({
    endpoint: "signup",
    options: {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
      ///////store Session cookie on the browser
      credentials: "include",
    },
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
  });
export const logout = () =>
  fetchFromAccount({
    endpoint: "logout",
    options: {
      ///////store Session cookie on the browser
      credentials: "include",
    },
    SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS,
  });
