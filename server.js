const server = require("express")();
const apiRouter = require("./routes/api");

server.use("/api", apiRouter);

module.exports = server;
