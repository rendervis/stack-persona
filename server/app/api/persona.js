const { Router } = require("express");
const PersonaTable = require("../persona/table");

const router = new Router();

router.get("/new", (req, res, next) => {
  let persona = req.app.locals.engine.generation.newPersona();
  PersonaTable.storePersona(persona)
    .then(({ personaId }) => {
      console.log("router.get(/new ", personaId);
      persona.personaId = personaId;
      res.json({ persona });
    })

    .catch((error) => next(error));
});

module.exports = router;
