const { Router } = require("express");
const AccounTable = require("../account/table");
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
      res.json({ message });
    })
    .catch((error) => next(error));
});

module.exports = router;
