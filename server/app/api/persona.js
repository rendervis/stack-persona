const { Router } = require("express");
const PersonaTable = require("../persona/table");

const router = new Router();

router.get("/new", (req, res) => {
  const persona = req.app.locals.engine.generation.newPersona();

  PersonaTable.storePersona(persona)
    .then(({ personaId }) => {
      console.log("personaId", personaId);
      persona.personaId = personaId;
      res.json({ persona });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
