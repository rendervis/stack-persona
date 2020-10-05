const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const GenerationEngine = require("./generation/engine");

///////router
const personaRouter = require("./api/persona");
const generationRouter = require("./api/generation");
const accountRouter = require("./api/account");

const app = express();
const engine = new GenerationEngine();
app.locals.engine = engine;
// app.use(cors());
const corsOptions = {
  origin: "http://localhost:1234",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/account", cors(corsOptions), accountRouter);
app.use("/generation", cors(corsOptions), generationRouter);
app.use("/personas", cors(corsOptions), personaRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });
});

engine.start();
module.exports = app;
