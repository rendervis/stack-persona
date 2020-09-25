const express = require("express");
const GenerationEngine = require("./generation/engine");
// const bodyParser = require("body-parser");

///////router
const personaRouter = require("./api/persona");
const generationRouter = require("./api/generation");

const app = express();
const engine = new GenerationEngine();
app.locals.engine = engine;
// app.use(bodyParser.json());

app.use("/generation", generationRouter);
app.use("/persona", personaRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });
});

engine.start();
module.exports = app;
