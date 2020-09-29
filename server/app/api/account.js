const { Router } = require("express");
const AccounTable = require("../account/table");

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { userName, password } = req.body;
  AccounTable.storeAccount({ userName, password })
    .then(() => res.json({ message: "success!" }))
    .catch((error) => next(error));
});

module.exports = router;
