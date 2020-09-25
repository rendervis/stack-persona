const pool = require("../../databasePool");
const PersonaTraitTable = require("../personaTrait/table");

class PersonaTable {
  static storePersona(persona) {
    const { birthDate, nickname, generationId } = persona;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO persona(birthdate,nickname,"generationId") 
        VALUES($1, $2, $3) RETURNING id`,
        [birthDate, nickname, generationId],
        (error, response) => {
          if (error) return reject(error);

          const personaId = response.rows[0].id;

          Promise.all(
            persona.traits.map(({ traitType, traitValue }) => {
              return PersonaTraitTable.storePersonaTrait({
                personaId,
                traitType,
                traitValue,
              });
            })
          )
            .then(() => {
              resolve({ personaId });
            })
            .catch((error) => reject(error));
        }
      );
    });
  }

  static getPersona({ personaId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT birthdate, nickname, "generationId"
        FROM persona
        WHERE persona.id = $1
        `,
        [personaId],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0) {
            return reject(new Error("no persona"));
          }

          resolve(response.rows[0]);
        }
      );
    });
  }
}

///////debug
// PersonaTable.getPersona({ personaId: 46 })
//   .then((persona) => console.log(persona))
//   .catch((error) => console.log("error", error));

module.exports = PersonaTable;
