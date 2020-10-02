import { ACCOUNT_PERSONAS } from "./types";

import { fetchFromAccount } from "./account";

export const fetchAccountPersonas = () =>
  fetchFromAccount({
    endpoint: "personas",
    options: { credentials: "include" },
    FETCH_TYPE: ACCOUNT_PERSONAS.FETCH,
    ERROR_TYPE: ACCOUNT_PERSONAS.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_PERSONAS.FETCH_SUCCESS,
  });
