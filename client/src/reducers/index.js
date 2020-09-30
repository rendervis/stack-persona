import { combineReducers } from "redux";

import generationReducer from "./generation";
import personaReducer from "./persona";
import accountReducer from "./account";

export default combineReducers({
  account: accountReducer,
  generation: generationReducer,
  persona: personaReducer,
});
