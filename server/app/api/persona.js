const { Router } = require("express");
const PersonaTable = require("../persona/table");
const AccountPersonaTable = require("../accountPersona/table");
const { authenticatedAccount } = require("./helper");
const { getPublicPersonas } = require("../persona/helper");

const router = new Router();

router.get("/new", (req, res, next) => {
  let accountId, persona;
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;
      persona = req.app.locals.engine.generation.newPersona();
      return PersonaTable.storePersona(persona);
    })
    .then(({ personaId }) => {
      persona.personaId = personaId;
      return AccountPersonaTable.storeAccountPersona({ accountId, personaId });
    })
    .then(() => {
      res.json({ persona });
    })
    .catch((error) => next(error));
});

router.put("/update", (req, res, next) => {
  const { personaId, nickname, isPublic, saleValue } = req.body;

  PersonaTable.updatePersona({ personaId, nickname, isPublic, saleValue })
    .then(() => {
      res.json({ message: "successfully updated persona" });
    })
    .catch((error) => next(error));
});

router.get("/public-personas", (req, res, next) => {
  getPublicPersonas()
    .then(({ personas }) => {
      res.json({ personas });
    })
    .catch((error) => next(error));
});

module.exports = router;
