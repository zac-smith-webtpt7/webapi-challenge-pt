const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

actionsRouter = require("./data/helpers/actionsRouter.js");
projectsRouter = require("./data/helpers/projectsRouter.js");

const server = express();
server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());

server.use("/api/actions", actionsRouter);
// server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    message: "GET for / is live!"
  });
});

module.exports = server;
