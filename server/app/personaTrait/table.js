const pool = require("../../databasePool");
const TraitTable = require("../trait/table");

class PersonaTraitTable {
  static storePersonaTrait({ personaId, traitType, traitValue }) {
    return new Promise((resolve, reject) => {
      TraitTable.getTraitId({ traitType, traitValue }).then(({ traitId }) => {
        pool.query(
          ` INSERT INTO "personaTrait"("traitId", "personaId") VALUES($1, $2)`,
          [traitId, personaId],
          (error, response) => {
            if (error) return reject(error);
            resolve();
          }
        );
      });
    });
  }
}

module.exports = PersonaTraitTable;
