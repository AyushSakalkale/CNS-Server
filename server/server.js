import {Server} from "socket.io";
import express from "express";
import http from "http";
import os from "os-utils";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {origin: "*"},
});

let clients = 0;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ayush</h1>");
});

io.on("connection", (socket) => {
  clients++;
  console.log(`Client connected. Active clients: ${clients}`);
  io.emit("active-clients", {clients});

  socket.on("disconnect", () => {
    clients--;
    console.log(`Client disconnected. Active clients: ${clients}`);
    io.emit("active-clients", {clients});
  });
});

// Send system stats every 2 seconds (more frequent updates)
setInterval(() => {
  os.cpuUsage((cpu) => {
    const memoryUsage = 100 - os.freememPercentage() * 100;

    // Intrusion detection if more than 70 clients
    const intrusionDetected = clients > 70 ? "Intrusion Detected" : "";

    io.emit("server-stats", {
      cpu: cpu * 100,
      memory: memoryUsage,
      activeClients: clients,
      intrusion: intrusionDetected,
    });
  });
}, 2000); // Update every 2 seconds for real-time data

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
