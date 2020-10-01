const { Router } = require("express");
const PersonaTable = require("../persona/table");
const AccountPersonaTable = require("../accountPersona/table");
const { authenticatedAccount } = require("./helper");

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

module.exports = router;
