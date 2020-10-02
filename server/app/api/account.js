const { Router } = require("express");
const AccountTable = require("../account/table");
const AccountPersonaTable = require("../accountPersona/table");
const Session = require("../account/session");
const { hash } = require("../account/helper");

const { setSession, authenticatedAccount } = require("./helper");
const { getPersonaWithTraits } = require("../persona/helper");

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { userName, password } = req.body;
  const userNameHash = hash(userName);
  const passwordHash = hash(password);

  ///check if the Account exists
  AccountTable.getAccount({ userNameHash })
    .then(({ account }) => {
      if (!account) {
        ///////add Account
        return AccountTable.storeAccount({ userNameHash, passwordHash });
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
  AccountTable.getAccount({ userNameHash: hash(userName) })
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
  AccountTable.updateSessionId({
    sessionId: null,
    userNameHash: hash(userName),
  })
    .then(() => {
      res.clearCookie("sessionString");
      res.json({ message: "Successful logout" });
    })
    .catch((error) => next(error));
});

router.get("/authenticated", (req, res, next) => {
  const { sessionString } = req.cookies;

  authenticatedAccount({ sessionString })
    .then(({ authenticated }) => res.json({ authenticated }))
    .catch((error) => next(error));

  ///////moved to /api/helper authenticatedAccount
  // if (!sessionString || !Session.verify(sessionString)) {
  //   const error = new Error("Invalid session");
  //   error.statusCode = 400;
  //   return next(error);
  // } else {
  //   const { userName, id } = Session.parse(sessionString);
  //   AccountTable.getAccount({ userNameHash: hash(userName) })
  //     .then(({ account }) => {
  //       const authenticated = account.sessionId === id;

  //       res.json({ authenticated });
  //     })
  //     .catch((error) => next(error));
  // }
});

router.get("/personas", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      return AccountPersonaTable.getAccountPersonas({
        accountId: account.id,
      });
    })
    .then(({ accountPersonas }) => {
      return Promise.all(
        accountPersonas.map((accountP) => {
          return getPersonaWithTraits({ personaId: accountP.personaId });
        })
      );
    })
    .then((personas) => {
      res.json({ personas });
    })
    .catch((error) => next(error));
});

module.exports = router;
