import React, { Component } from "react";
import {
  skinny,
  slender,
  sporty,
  stocky,
  patchy,
  plain,
  spotted,
  striped,
} from "../assets";

// Call object collections map, to distinguish between arrays
const personaTraitPropertyMap = {
  backgroundColor: {
    black: "#263238",
    white: "#cfd8dc",
    green: "#a5d6a7",
    blue: "#0277bd",
  },
  build: { slender, stocky, sporty, skinny },
  pattern: { plain, striped, spotted, patchy },
  size: { small: 140, medium: 170, large: 200, enormous: 230 },
};

class PersonaAvatar extends Component {
  get PersonaImage() {
    // not really a styling. Since it can be a style or an image
    // Therefore, property is a good name
    const propertyMap = {};

    this.props.persona.traits.forEach((trait) => {
      const { traitType, traitValue } = trait;

      propertyMap[traitType] = personaTraitPropertyMap[traitType][traitValue];
    });

    const { backgroundColor, build, pattern, size } = propertyMap;
    const sizing = { width: size, height: size };

    return (
      <div className="persona-avatar-image-wrapper">
        <div
          className="persona-avatar-image-background"
          style={{
            backgroundColor,
            width: sizing.width,
            height: sizing.height,
          }}
        ></div>
        <img
          src={pattern}
          className="persona-avatar-image-pattern"
          style={{ width: sizing.width, height: sizing.height }}
        />
        <img
          src={build}
          className="persona-avatar-image"
          style={{ width: sizing.width, height: sizing.height }}
        />
      </div>
    );
  }

  render() {
    const { generationId, personaId, traits } = this.props.persona;

    if (!personaId) return <div></div>;

    return (
      <div>
        <span>G{generationId}.</span>
        <span>I{personaId}. </span>
        {traits.map((trait) => trait.traitValue).join(", ")}
        {this.PersonaImage}
      </div>
    );
  }
}

export default PersonaAvatar;
