const Generation = require("./index");
const GenerationTable = require("./table");

class GenerationEngine {
  constructor() {
    this.generation = null;
    this.timer = null;
  }
  start() {
    this.buildNewGeneration();
  }
  stop() {
    clearTimeout(this.timer);
  }

  buildNewGeneration() {
    const generation = new Generation();

    GenerationTable.storeGeneration(generation)
      .then(({ generationId }) => {
        generation.setId(generationId);
        this.generation = generation;

        console.log("new generation", this.generation);
        this.timer = setTimeout(
          () => this.buildNewGeneration(),
          this.generation.expiration.getTime() - Date.now()
        );
      })
      .catch((error) => console.error(error));
  }
}

module.exports = GenerationEngine;
