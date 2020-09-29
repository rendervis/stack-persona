const pool = require("../../databasePool");

class AccountTable {
  static storeAccount({ userNameHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account("usernameHash", "passwordHash") VALUES($1, $2)`,
        [userNameHash, passwordHash],
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
        `SELECT id, "passwordHash" FROM account
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
}

module.exports = AccountTable;