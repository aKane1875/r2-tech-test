const server = require("express")();
const apiRouter = require("./routes/api");
const express = require("express");

server.use(express.json());
server.use("/api", apiRouter);

module.exports = server;
