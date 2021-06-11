// implement your server here
// require your posts router and connect it here
const express = require("express");
//postsRouter
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Welcome to the API for posts" });
});

module.exports = server;
