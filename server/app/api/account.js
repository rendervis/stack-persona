const { Router } = require("express");
const AccounTable = require("../account/table");
const Session = require("../account/session");
const { hash } = require("../account/helper");

const { setSession } = require("./helper");

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { userName, password } = req.body;
  const userNameHash = hash(userName);
  const passwordHash = hash(password);

  ///check if the Account exists
  AccounTable.getAccount({ userNameHash })
    .then(({ account }) => {
      if (!account) {
        ///////add Account
        return AccounTable.storeAccount({ userNameHash, passwordHash });
      } else {
        const error = new Error(`This username  has already been taken.`);
        error.statusCode = 409;
        throw error;
      }
    })
    .then(() => {
      ///////start Session
      return setSession({ userName, res });
    })
    .then(({ message }) => {
      ///////respond to client
      console.log({ message });
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/login", (req, res, next) => {
  const { userName, password } = req.body;
  AccounTable.getAccount({ userNameHash: hash(userName) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;
        return setSession({ userName, res, sessionId });
      } else {
        const error = new Error("Incorrect username/password");
        error.statusCode = 409;
        throw error;
      }
    })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

router.get("/logout", (req, res, next) => {
  const { userName } = Session.parse(req.cookies.sessionString);
  AccounTable.updateSessionId({
    sessionId: null,
    userNameHash: hash(userName),
  })
    .then(() => {
      res.clearCookie("sessionString");
      res.json({ message: "Successful logout" });
    })
    .catch((error) => next(error));
});
module.exports = router;
