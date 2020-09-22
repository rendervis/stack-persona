const pool = require("../../databasePool");

class PersonaTable {
  static storePersona(persona) {
    const { birthdate, nickname, generationId } = persona;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO persona(birthdate,nickname,"generationId") 
        VALUES($1, $2, $3) RETURN id `,
        [birthdate, nickname, generationId],
        (error, response) => {
          console.log("response", response);
          if (error) return reject(error);

          const personaId = response.rows[0].id;
          resolve({ personaId });
        }
      );
    });
  }
}
module.exports = PersonaTable;
