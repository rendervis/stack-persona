const pool = require("../../databasePool");
const PersonaTraitTable = require("../personaTrait/table");

class PersonaTable {
  static storePersona(persona) {
    const { birthDate, nickname, generationId, isPublic, saleValue } = persona;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO 
        persona(birthdate,nickname,"generationId", "isPublic","saleValue") 
        VALUES($1, $2, $3, $4, $5) RETURNING id`,
        [birthDate, nickname, generationId, isPublic, saleValue],
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
        `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue"
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

  static updatePersona({ personaId, nickname, isPublic, saleValue }) {
    const settingsMap = { nickname, isPublic, saleValue };
    const validQueries = Object.entries(settingsMap).filter(
      ([settingKey, settingValue]) => {
        if (settingValue !== undefined) {
          return new Promise((resolve, reject) => {
            pool.query(
              `UPDATE persona
           SET "${settingKey}"=$1
           WHERE id=$2
           `,
              [settingValue, personaId],
              (error, response) => {
                if (error) return reject(error);
                resolve();
              }
            );
          });
        }
      }
    );
    return Promise.all(validQueries);
    // return new Promise((resolve, reject) => {
    //   pool.query(
    //     `UPDATE persona
    //     SET nickName=$1, "isPublic"=$2, "saleValue"=$3
    //       WHERE id=$4
    //       `,
    //     [nickName, isPublic, saleValue, personaId],
    //     (error, response) => {
    //       if (error) return reject(error);

    //       resolve();
    //     }
    //   );
    // });
  }
}

///////debug
// PersonaTable.getPersona({ personaId: 46 })
//   .then((persona) => console.log(persona))
//   .catch((error) => console.log("error", error));

// PersonaTable.updatePersona({ personaId: 1, nickName: "fooby" })
//   .then(() => console.log("successfully updated persona!"))
//   .catch((error) => console.error("error", error));

module.exports = PersonaTable;
