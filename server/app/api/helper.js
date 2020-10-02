const Session = require("../account/session");
const { hash } = require("../account/helper");
const AccountTable = require("../account/table");

const setSession = ({ userName, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;
    if (sessionId) {
      sessionString = Session.sessionString({ userName, id: sessionId });
      setSessionCookie({ sessionString, res });
      resolve({ message: "session restored." });
    } else {
      session = new Session({ userName });
      sessionString = session.toString();
      AccountTable.updateSessionId({
        sessionId: session.id,
        userNameHash: hash(userName),
      })
        .then(() => {
          setSessionCookie({ sessionString, res });
          resolve({ message: "session created" });
        })
        .catch((error) => reject(error));
    }
  });
};

setSessionCookie = ({ sessionString, res }) => {
  res.cookie("sessionString", sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true,
    // secure: true, // use with https
  });
};

const authenticatedAccount = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error("Invalid session");
      error.statusCode = 400;
      return reject(error);
    } else {
      const { userName, id } = Session.parse(sessionString);
      AccountTable.getAccount({ userNameHash: hash(userName) })
        .then(({ account }) => {
          const authenticated = account.sessionId === id;

          resolve({ account, authenticated, userName });
        })
        .catch((error) => reject(error));
    }
  });
};
module.exports = { setSession, authenticatedAccount };
