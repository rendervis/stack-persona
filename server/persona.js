const DEFAULT_PROPERTIES = {
  nickname: "unnamed",
  get birthDate() {
    return new Date();
  },
};

class Persona {
  constructor({ birthDate, nickname } = {}) {
    this.birthDate = birthDate || DEFAULT_PROPERTIES.birthDate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
  }
}

module.exports = Persona;
