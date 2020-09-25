const pool = require("../../databasePool");
const PersonaTable = require("./table");
const Persona = require("./index");

const getPersonaWithTraits = ({ personaId }) => {
  return Promise.all([
    PersonaTable.getPersona({ personaId }),
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT "traitType", "traitValue" 
                FROM trait
                    INNER JOIN "personaTrait" ON 
                    trait.id = "personaTrait"."traitId"
                    WHERE "personaTrait"."personaId" = $1

                `,
        [personaId],
        (error, response) => {
          if (error) return reject(error);

          resolve(response.rows);
        }
      );
    }),
  ])
    .then(([persona, personaTraits]) => {
      return new Persona({
        ...persona,
        traits: personaTraits,
        personaId: personaId,
      });
    })
    .catch((error) => console.error(error));
};

///////debug
// getPersonaWithTraits({ personaId: 47 })
//   .then((persona) => console.log("persona", persona))
//   .catch((error) => console.error("error", error));

module.exports = { getPersonaWithTraits };
