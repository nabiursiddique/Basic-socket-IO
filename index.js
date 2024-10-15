// Backend
const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

// socket io code
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

// For rendering/showing index.html (Because we don't have any frontend)
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

// server listening at port 3000
server.listen(3000, () => {
  console.log("server running at port 3000");
});
