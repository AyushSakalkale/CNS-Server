// import {Server} from "socket.io";
// import express from "express";
// import http from "http";
// import os from "os-utils";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {origin: "*"},
// });

// let clients = 0;

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Ayush</h1>");
// });

// io.on("connection", (socket) => {
//   clients++;
//   console.log(`Client connected. Active clients: ${clients}`);
//   io.emit("active-clients", {clients});

//   socket.on("disconnect", () => {
//     clients--;
//     console.log(`Client disconnected. Active clients: ${clients}`);
//     io.emit("active-clients", {clients});
//   });
// });

// // Send system stats every 2 seconds (more frequent updates)
// setInterval(() => {
//   os.cpuUsage((cpu) => {
//     const memoryUsage = 100 - os.freememPercentage() * 100;

//     // Intrusion detection if more than 70 clients
//     const intrusionDetected = clients > 70 ? "Intrusion Detected" : "";

//     io.emit("server-stats", {
//       cpu: cpu * 100,
//       memory: memoryUsage,
//       activeClients: clients,
//       intrusion: intrusionDetected,
//     });
//   });
// }, 2000); // Update every 2 seconds for real-time data

// const PORT = 3000;
// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });

// import {Server} from "socket.io";
// import express from "express";
// import http from "http";
// import os from "os";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {origin: "*"},
// });

// // Object to store active clients details
// let activeClients = {};

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Ayush</h1>");
// });

// io.on("connection", (socket) => {
//   // Capture client IP address from the handshake
//   const clientIp = socket.handshake.address;
//   activeClients[socket.id] = {
//     ip: clientIp,
//     connectedAt: new Date().toLocaleTimeString(),
//   };

//   console.log(`Client connected: ${clientIp} (Socket ID: ${socket.id})`);
//   io.emit("active-clients", activeClients);

//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${clientIp} (Socket ID: ${socket.id})`);
//     delete activeClients[socket.id];
//     io.emit("active-clients", activeClients);
//   });
// });

// // Helper function to calculate overall CPU usage from all cores
// const getCpuUsage = () => {
//   const cpus = os.cpus();
//   let totalIdle = 0,
//     totalTick = 0;

//   cpus.forEach((cpu) => {
//     for (let type in cpu.times) {
//       totalTick += cpu.times[type];
//     }
//     totalIdle += cpu.times.idle;
//   });

//   const usage = ((1 - totalIdle / totalTick) * 100).toFixed(2);
//   return usage;
// };

// // Send system stats every 2 seconds
// setInterval(() => {
//   const cpuUsage = getCpuUsage();
//   const totalMemory = os.totalmem();
//   const freeMemory = os.freemem();
//   const memoryUsage = 100 - (freeMemory / totalMemory) * 100;
//   const clientsCount = Object.keys(activeClients).length;
//   const intrusionDetected = clientsCount > 70 ? "Intrusion Detected" : "";

//   io.emit("server-stats", {
//     cpu: cpuUsage,
//     memory: memoryUsage,
//     activeClientsCount: clientsCount,
//     intrusion: intrusionDetected,
//   });
// }, 2000);

// const PORT = 3000;
// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });

import {Server} from "socket.io";
import express from "express";
import http from "http";
import os from "os";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {origin: "*"},
});

// Serve static files from the "public" folder
app.use(express.static("../public"));

// Optional: Route "/" to serve index.html explicitly
app.get("/", (req, res) => {
  res.sendFile("index.html", {root: "../public/index.html"});
});

// Object to store active clients details
let activeClients = {};

io.on("connection", (socket) => {
  // Capture client IP address from the handshake
  const clientIp =
    socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;
  activeClients[socket.id] = {
    ip: clientIp,
    connectedAt: new Date().toLocaleTimeString(),
  };

  console.log(`Client connected: ${clientIp} (Socket ID: ${socket.id})`);
  io.emit("active-clients", activeClients);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${clientIp} (Socket ID: ${socket.id})`);
    delete activeClients[socket.id];
    io.emit("active-clients", activeClients);
  });
});

// Function to calculate overall CPU usage using load average
const getCpuUsage = () => (os.loadavg()[0] * 100).toFixed(2);

// Send system stats every 2 seconds
setInterval(() => {
  const cpuUsage = getCpuUsage();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = ((usedMemory / totalMemory) * 100).toFixed(2);
  const clientsCount = Object.keys(activeClients).length;
  const intrusionDetected = clientsCount > 70 ? "Intrusion Detected" : "";

  io.emit("server-stats", {
    cpu: cpuUsage,
    memory: memoryUsage,
    activeClientsCount: clientsCount,
    intrusion: intrusionDetected,
    activeClients: Object.values(activeClients), // Detailed list of active clients
  });
}, 2000);

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
