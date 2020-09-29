const pool = require("../../databasePool");

class AccountTable {
  static storeAccount({ userName, password }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account(username, password) VALUES($1, $2)`,
        [userName, password],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}

module.exports = AccountTable;
