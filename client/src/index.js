import React from "react";
import { render } from "react-dom";

import Generation from "./components/Generation";
import Persona from "./components/Persona";

render(
  <div>
    <h2>Persona Stack from REACT!</h2>
    <Generation />
    <Persona />
  </div>,
  document.getElementById("root")
);
