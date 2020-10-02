const pool = require("../../databasePool");
const { STARTING_BALANCE } = require("../config");

class AccountTable {
  static storeAccount({ userNameHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account("usernameHash", "passwordHash", balance) VALUES($1, $2, $3)`,
        [userNameHash, passwordHash, STARTING_BALANCE],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static getAccount({ userNameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, "passwordHash", "sessionId", balance
         FROM account
         WHERE "usernameHash" = $1
        `,
        [userNameHash],
        (error, response) => {
          if (error) return reject(error);
          resolve({ account: response.rows[0] });
        }
      );
    });
  }

  static updateSessionId({ sessionId, userNameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE account SET "sessionId" = $1 WHERE "usernameHash" = $2`,
        [sessionId, userNameHash],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}

module.exports = AccountTable;
