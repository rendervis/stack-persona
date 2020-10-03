const TRAITS = require("../../data/traits.json");

const DEFAULT_PROPERTIES = {
  personaId: undefined,
  nickname: "unnamed",
  generationId: undefined,
  isPublic: false,
  saleValue: 0,
  get birthDate() {
    return new Date();
  },
  get randomTraits() {
    const traits = [];
    TRAITS.forEach((TRAIT) => {
      const traitType = TRAIT.type;
      const traitValues = TRAIT.values;
      const traitValue =
        traitValues[Math.floor(Math.random() * traitValues.length)];
      traits.push({ traitType, traitValue });
    });

    return traits;
  },
};

class Persona {
  constructor({
    personaId,
    birthDate,
    nickname,
    traits,
    generationId,
    saleValue,
    isPublic,
  } = {}) {
    this.personaId = personaId || DEFAULT_PROPERTIES.personaId;
    this.birthDate = birthDate || DEFAULT_PROPERTIES.birthDate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
    this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
    this.saleValue = saleValue || DEFAULT_PROPERTIES.saleValue;
    this.isPublic = isPublic || DEFAULT_PROPERTIES.isPublic;
  }
}

module.exports = Persona;
