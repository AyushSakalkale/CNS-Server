// import {io} from "socket.io-client";

// const SERVER_URL = "http://192.168.232.74:3000"; // Replace with your actual server IP
// const CLIENTS = 500; // Number of fake clients
// const MESSAGE_INTERVAL = 70; // Time in ms (1 second)

// const clients = [];

// for (let i = 0; i < CLIENTS; i++) {
//   const socket = io(SERVER_URL, {
//     reconnection: false, // Prevents auto-reconnection
//     transports: ["websocket"],
//   });

//   socket.on("connect", () => {
//     console.log(`Client ${i + 1} connected`);
//     setInterval(() => {
//       socket.emit("load-test", {clientId: i, message: "Generating load..."});
//     }, MESSAGE_INTERVAL);
//   });

//   socket.on("disconnect", () => {
//     console.log(`Client ${i + 1} disconnected`);
//   });

//   clients.push(socket);
// }

import {io} from "socket.io-client";

const SERVER_URL = "http://192.168.160.74:3000"; // Replace with your actual server IP
const NUMBER_OF_FAKE_CLIENTS = 100;

const clients = [];

for (let i = 0; i < NUMBER_OF_FAKE_CLIENTS; i++) {
  const socket = io(SERVER_URL, {
    reconnection: false,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log(`Fake client ${i + 1} connected`);
  });

  socket.on("disconnect", () => {
    console.log(`Fake client ${i + 1} disconnected`);
  });

  clients.push(socket);
}
