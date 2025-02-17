import express from "express";
import http from "http";
import {Server} from "socket.io";
import os from "os-utils";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ayush</h1>");
});

io.on("connection", (socket) => {
  console.log("Client connected");
});

// Send system stats every 3 seconds
setInterval(() => {
  os.cpuUsage((v) => {
    io.emit("server-stats", {
      cpu: v * 100,
      memory: 100 - os.freememPercentage() * 100,
      uptime: os.processUptime(),
    });
  });
}, 3000);

const HOST = "0.0.0.0"; // Listen on all network interfaces
const PORT = 3000;

server.listen(PORT, HOST, () =>
  console.log(`Server running on http://${HOST}:${PORT}`)
);
