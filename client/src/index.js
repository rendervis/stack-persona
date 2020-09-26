import React from "react";
import { render } from "react-dom";

import Generation from "./components/Generation";

render(
  <div>
    <h2>Persona Stack from REACT!</h2>
    <Generation />
  </div>,
  document.getElementById("root")
);