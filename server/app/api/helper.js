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
module.exports = { setSession };
