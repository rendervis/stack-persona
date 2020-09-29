const { v4: uuid } = require("uuid");
const { hash } = require("./helper");

const SEPARATOR = "|";
class Session {
  constructor({ userName }) {
    this.userName = userName;
    this.id = uuid();
  }

  toString() {
    const { userName, id } = this;
    return Session.sessionString({ userName, id });
  }

  static accountData({ userName, id }) {
    return `${userName}${SEPARATOR}${id}`;
  }

  static sessionString({ userName, id }) {
    const accountData = Session.accountData({ userName, id });
    return `${accountData}${SEPARATOR}${hash(accountData)}`;
  }

  static parse(sessionString) {
    const sessionData = sessionString.split(SEPARATOR);
    return {
      userName: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2],
    };
  }

  static verify(sessionString) {
    const { userName, id, sessionHash } = Session.parse(sessionString);
    const accountData = Session.accountData({ userName, id });
    return hash(accountData) === sessionHash;
  }
}

///////debug
// const foo = new Session({ userName: "foo" });
// const fooString = foo.toString();
// console.log(Session.parse(fooString));
// const fake = `admin${fooString}`;
// console.log(Session.verify(fake));

///////nodemon server/app/account/session.js

module.exports = Session;
