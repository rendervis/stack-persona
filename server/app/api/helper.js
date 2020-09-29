const Session = require("../account/session");
const { hash } = require("../account/helper");
const AccountTable = require("../account/table");

const setSession = ({ userName, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ userName });
    const sessionString = session.toString();

    AccountTable.updateSessionId({
      sessionId: session.id,
      userNameHash: hash(userName),
    })
      .then(() => {
        res.cookie("sessionString", sessionString, {
          expire: Date.now() + 3600000,
          httpOnly: true,
          // secure: true, // use with https
        });
        resolve({ message: "session created" });
      })
      .catch((error) => reject(error));
  });
};

module.exports = { setSession };
