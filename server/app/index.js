const express = require("express");
const bodyParser = require("body-parser");

const GenerationEngine = require("./generation/engine");
///////router
const personaRouter = require("./api/persona");
const generationRouter = require("./api/generation");

const app = express();
app.use(bodyParser.json());
const engine = new GenerationEngine();
app.locals.engine = engine;

app.use("/persona", personaRouter);
app.use("/generation", generationRouter);

engine.start();
module.exports = app;
