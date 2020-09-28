import { combineReducers } from "redux";

import generationReducer from "./generation";

export default combineReducers({
  generation: generationReducer,
});
