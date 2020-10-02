import { combineReducers } from "redux";

import accountReducer from "./account";
import accountPersonasReducer from "./accountPersonas";
import generationReducer from "./generation";
import personaReducer from "./persona";
import accountInfoReducer from "./accountInfo";

export default combineReducers({
  account: accountReducer,
  generation: generationReducer,
  persona: personaReducer,
  accountPersonas: accountPersonasReducer,
  accountInfo: accountInfoReducer,
});
