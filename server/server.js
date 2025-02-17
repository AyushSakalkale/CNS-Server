// import express from "express";
// import http from "http";
// import {Server} from "socket.io";
// import os from "os-utils";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Ayush</h1>");
// });

// io.on("connection", (socket) => {
//   console.log("Client connected");
// });

// // Send system stats every 3 seconds
// setInterval(() => {
//   os.cpuUsage((v) => {
//     io.emit("server-stats", {
//       cpu: v * 100,
//       memory: 100 - os.freememPercentage() * 100,
//       uptime: os.processUptime(),
//     });
//   });
// }, 3000);

// const HOST = "0.0.0.0"; // Listen on all network interfaces
// const PORT = 3000;

// server.listen(PORT, HOST, () =>
//   console.log(`Server running on http://${HOST}:${PORT}`)
// );

// import express from "express";
// import http from "http";
// import {Server} from "socket.io";
// import os from "os";
// import osUtils from "os-utils";
// import si from "systeminformation";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// // Add the root route to serve "Welcome to Ayush" message
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Ayush</h1>");
// });

// let connectedClients = {}; // Store connected clients info

// // Track client connections
// io.on("connection", (socket) => {
//   const clientIp = socket.handshake.address; // Get client IP
//   connectedClients[socket.id] = {
//     ip: clientIp,
//     connectedAt: new Date().toISOString(),
//   };

//   console.log(`Client connected: ${clientIp}, ID: ${socket.id}`);
//   console.log(
//     `Total connected clients: ${Object.keys(connectedClients).length}`
//   );

//   // Send welcome message to this client
//   socket.emit("welcome-message", "Welcome to Ayush!");

//   // Send updated client list to all clients
//   io.emit("active-clients", connectedClients);

//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${clientIp}, ID: ${socket.id}`);
//     delete connectedClients[socket.id];

//     // Send updated client list
//     io.emit("active-clients", connectedClients);
//   });
// });

// // Function to collect system stats
// const getServerStats = async () => {
//   const cpuUsage = await new Promise((resolve) => {
//     osUtils.cpuUsage((v) => resolve(v * 100));
//   });

//   const memoryUsage = 100 - (os.freemem() / os.totalmem()) * 100;
//   const uptime = os.uptime();
//   const processUptime = process.uptime();
//   const loadAvg = os.loadavg(); // [1 min, 5 min, 15 min load averages]

//   // Get network and disk info
//   const netStats = await si.networkStats();
//   const diskInfo = await si.fsSize();

//   return {
//     cpuUsage,
//     memoryUsage,
//     uptime,
//     processUptime,
//     loadAvg,
//     activeClients: Object.keys(connectedClients).length,
//     network: {
//       tx_bytes: netStats[0]?.tx_bytes || 0, // Bytes sent
//       rx_bytes: netStats[0]?.rx_bytes || 0, // Bytes received
//     },
//     disk: {
//       total: diskInfo[0]?.size / 1e9 || 0, // GB
//       used: diskInfo[0]?.used / 1e9 || 0, // GB
//       free: diskInfo[0]?.available / 1e9 || 0, // GB
//     },
//   };
// };

// // Send system stats every 3 seconds
// setInterval(async () => {
//   const stats = await getServerStats();
//   io.emit("server-stats", stats);
// }, 3000);

// const HOST = "0.0.0.0"; // Listen on all network interfaces
// const PORT = 3000;

// server.listen(PORT, HOST, () =>
//   console.log(`Server running on http://${HOST}:${PORT}`)
// );

import express from "express";
import http from "http";
import {Server} from "socket.io";
import os from "os";
import osUtils from "os-utils";
import si from "systeminformation";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Add the root route to serve "Welcome to Ayush" message
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ayush</h1>");
});

let connectedClients = {}; // Store connected clients info

// Track client connections
io.on("connection", (socket) => {
  const clientIp = socket.handshake.address; // Get client IP
  connectedClients[socket.id] = {
    ip: clientIp,
    connectedAt: new Date().toISOString(),
  };

  console.log(`Client connected: ${clientIp}, ID: ${socket.id}`);
  console.log(
    `Total connected clients: ${Object.keys(connectedClients).length}`
  );

  // Send welcome message to this client
  socket.emit("welcome-message", "Welcome to Ayush!");

  // Send updated client list to all clients
  io.emit("active-clients", connectedClients);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${clientIp}, ID: ${socket.id}`);
    delete connectedClients[socket.id]; // Remove client from the connectedClients object

    // Send updated client list
    io.emit("active-clients", connectedClients);
    console.log(
      `Total connected clients: ${Object.keys(connectedClients).length}`
    );
  });
});

// Function to collect system stats
const getServerStats = async () => {
  const cpuUsage = await new Promise((resolve) => {
    osUtils.cpuUsage((v) => resolve(v * 100));
  });

  const memoryUsage = 100 - (os.freemem() / os.totalmem()) * 100;
  const uptime = os.uptime();
  const processUptime = process.uptime();
  const loadAvg = os.loadavg(); // [1 min, 5 min, 15 min load averages]

  // Get network and disk info
  const netStats = await si.networkStats();
  const diskInfo = await si.fsSize();

  return {
    cpuUsage,
    memoryUsage,
    uptime,
    processUptime,
    loadAvg,
    activeClients: Object.keys(connectedClients).length, // Ensure active client count is correct
    network: {
      tx_bytes: netStats[0]?.tx_bytes || 0, // Bytes sent
      rx_bytes: netStats[0]?.rx_bytes || 0, // Bytes received
    },
    disk: {
      total: diskInfo[0]?.size / 1e9 || 0, // GB
      used: diskInfo[0]?.used / 1e9 || 0, // GB
      free: diskInfo[0]?.available / 1e9 || 0, // GB
    },
  };
};

// Send system stats every 3 seconds and log them to terminal
setInterval(async () => {
  const stats = await getServerStats();

  // Log stats to terminal
  console.clear(); // Clear previous stats for cleaner output
  console.log("Server Stats (updated every 3 seconds):");
  console.log(`CPU Usage: ${stats.cpuUsage.toFixed(2)}%`);
  console.log(`Memory Usage: ${stats.memoryUsage.toFixed(2)}%`);
  console.log(`Uptime: ${stats.uptime.toFixed(2)}s`);
  console.log(`Process Uptime: ${stats.processUptime.toFixed(2)}s`);
  console.log(
    `Load Average (1 min, 5 min, 15 min): ${stats.loadAvg
      .map((avg) => avg.toFixed(2))
      .join(", ")}`
  );
  console.log(
    `Network (TX/RX): ${stats.network.tx_bytes} / ${stats.network.rx_bytes} bytes`
  );
  console.log(
    `Disk (Total/Used/Free): ${stats.disk.total}GB / ${stats.disk.used}GB / ${stats.disk.free}GB`
  );
  console.log(`Active Clients: ${stats.activeClients}`);

  // Emit stats to clients via Socket.io
  io.emit("server-stats", stats);
}, 3000);

const HOST = "0.0.0.0"; // Listen on all network interfaces
const PORT = 3000;

server.listen(PORT, HOST, () =>
  console.log(`Server running on http://${HOST}:${PORT}`)
);
