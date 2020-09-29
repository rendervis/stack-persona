import { combineReducers } from "redux";

import generationReducer from "./generation";
import personaReducer from "./persona";

export default combineReducers({
  generation: generationReducer,
  persona: personaReducer,
});
