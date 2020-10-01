const pool = require("../../databasePool");

class AccountPersonaTable {
  static storeAccountPersona({ accountId, personaId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO accountPersona("accountId", "personaId")
                VALUES($1, $2)
                `,
        [accountId, personaId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  static getAccountPersonas({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "personaId" FROM accountPersona
        WHERE "accountId" =$1
        `,
        [accountId],
        (error, response) => {
          if (error) return reject(error);
          resolve({ accountPersonas: response.rows });
        }
      );
    });
  }
}

//////debug
// AccountPersonaTable.storeAccountPersona({
//   accountId: 1,
//   personaId: 3,
// })
//   .then(() => console.log("store"))
//   .catch((error) => console.error("error", error));

// AccountPersonaTable.getAccountPersonas({ accountId: 1 })
//   .then(({ accountPersonas }) =>
//     console.log("accountPersonas", accountPersonas)
//   )
//   .catch((error) => console.error("error", error));
module.exports = AccountPersonaTable;
