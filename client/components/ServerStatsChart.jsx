// import React, {useEffect, useState} from "react";
// import {io} from "socket.io-client";
// import {Line} from "react-chartjs-2";
// import "chart.js/auto";

// const socket = io("http://192.168.232.74:3000"); // Replace with your actual server IP

// const ServerStatsChart = () => {
//   const [stats, setStats] = useState({
//     cpuUsage: [],
//     memoryUsage: [],
//     activeClients: [],
//     intrusion: "",
//     timestamps: [],
//   });

//   useEffect(() => {
//     socket.on("server-stats", (data) => {
//       setStats((prevStats) => ({
//         cpuUsage: [...prevStats.cpuUsage.slice(-9), data.cpu],
//         memoryUsage: [...prevStats.memoryUsage.slice(-9), data.memory],
//         activeClients: [
//           ...prevStats.activeClients.slice(-9),
//           data.activeClients,
//         ],
//         intrusion: data.intrusion, // Show intrusion message
//         timestamps: [
//           ...prevStats.timestamps.slice(-9),
//           new Date().toLocaleTimeString(),
//         ],
//       }));
//     });

//     return () => socket.off("server-stats");
//   }, []);

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         suggestedMax: 100, // Always scale between 0 and 100
//       },
//     },
//   };

//   const cpuData = {
//     labels: stats.timestamps,
//     datasets: [
//       {
//         label: "CPU Usage (%)",
//         data: stats.cpuUsage,
//         borderColor: "red",
//         backgroundColor: "rgba(255, 0, 0, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   const memoryData = {
//     labels: stats.timestamps,
//     datasets: [
//       {
//         label: "Memory Usage (%)",
//         data: stats.memoryUsage,
//         borderColor: "blue",
//         backgroundColor: "rgba(0, 0, 255, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   const activeClientsData = {
//     labels: stats.timestamps,
//     datasets: [
//       {
//         label: "Active Clients",
//         data: stats.activeClients,
//         borderColor: "green",
//         backgroundColor: "rgba(0, 255, 0, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Server Load Charts</h2>
//       {stats.intrusion && (
//         <div style={{color: "red", fontSize: "100px"}}>
//           <strong>{stats.intrusion}</strong>
//         </div>
//       )}
//       <div style={{width: "80%", margin: "auto", height: "300px"}}>
//         <h3>CPU Usage (%)</h3>
//         <Line data={cpuData} options={chartOptions} />
//         {/*
//         <h3>Memory Usage (%)</h3>
//         <Line data={memoryData} options={chartOptions} /> */}

//         <h3>Active Clients</h3>
//         <Line data={activeClientsData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default ServerStatsChart;

// import React, {useEffect, useState} from "react";
// import {io} from "socket.io-client";
// import {Line} from "react-chartjs-2";
// import "chart.js/auto";

// // Replace <your-server-ip> with your actual server IP or domain
// const socket = io("http://192.168.160.74:3000");

// const ServerStatsChart = () => {
//   const [stats, setStats] = useState({
//     cpuUsage: [],
//     memoryUsage: [],
//     activeClientsCount: [],
//     intrusion: "",
//     timestamps: [],
//   });
//   const [activeClients, setActiveClients] = useState({});

//   useEffect(() => {
//     socket.on("server-stats", (data) => {
//       setStats((prevStats) => ({
//         cpuUsage: [...prevStats.cpuUsage.slice(-9), data.cpu],
//         memoryUsage: [...prevStats.memoryUsage.slice(-9), data.memory],
//         activeClientsCount: [
//           ...prevStats.activeClientsCount.slice(-9),
//           data.activeClientsCount,
//         ],
//         intrusion: data.intrusion,
//         timestamps: [
//           ...prevStats.timestamps.slice(-9),
//           new Date().toLocaleTimeString(),
//         ],
//       }));
//     });

//     socket.on("active-clients", (data) => {
//       setActiveClients(data);
//     });

//     return () => {
//       socket.off("server-stats");
//       socket.off("active-clients");
//     };
//   }, []);

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         suggestedMax: 100,
//       },
//     },
//   };

//   const cpuData = {
//     labels: stats.timestamps,
//     datasets: [
//       {
//         label: "CPU Usage (%)",
//         data: stats.cpuUsage,
//         borderColor: "red",
//         backgroundColor: "rgba(255, 0, 0, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   const memoryData = {
//     labels: stats.timestamps,
//     datasets: [
//       {
//         label: "Memory Usage (%)",
//         data: stats.memoryUsage,
//         borderColor: "blue",
//         backgroundColor: "rgba(0, 0, 255, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   const activeClientsData = {
//     labels: stats.timestamps,
//     datasets: [
//       {
//         label: "Active Clients Count",
//         data: stats.activeClientsCount,
//         borderColor: "green",
//         backgroundColor: "rgba(0, 255, 0, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Server Load Charts</h2>
//       {stats.intrusion && (
//         <div style={{color: "red", fontSize: "20px"}}>
//           <strong>{stats.intrusion}</strong>
//         </div>
//       )}
//       <div style={{width: "80%", margin: "auto", height: "300px"}}>
//         <h3>CPU Usage (%)</h3>
//         <Line data={cpuData} options={chartOptions} />

//         <h3>Memory Usage (%)</h3>
//         <Line data={memoryData} options={chartOptions} />

//         <h3>Active Clients Count</h3>
//         <Line data={activeClientsData} options={chartOptions} />
//       </div>

//       <h2>Active Clients Details</h2>
//       <table
//         border="1"
//         style={{margin: "auto", width: "80%", textAlign: "left"}}
//       >
//         <thead>
//           <tr>
//             <th>Socket ID</th>
//             <th>IP Address</th>
//             <th>Connected At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(activeClients).map(([socketId, details]) => (
//             <tr key={socketId}>
//               <td>{socketId}</td>
//               <td>{details.ip}</td>
//               <td>{details.connectedAt}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ServerStatsChart;

import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {Line} from "react-chartjs-2";
import "chart.js/auto";

// Replace <your-server-ip> with your actual server IP or domain
const socket = io("http://192.168.32.233:3000");

const ServerStatsChart = () => {
  const [stats, setStats] = useState({
    cpuUsage: [],
    memoryUsage: [],
    activeClientsCount: [],
    intrusion: "",
    timestamps: [],
  });
  const [activeClients, setActiveClients] = useState({});

  useEffect(() => {
    socket.on("server-stats", (data) => {
      setStats((prevStats) => ({
        cpuUsage: [...prevStats.cpuUsage.slice(-9), data.cpu],
        memoryUsage: [...prevStats.memoryUsage.slice(-9), data.memory],
        activeClientsCount: [
          ...prevStats.activeClientsCount.slice(-9),
          data.activeClientsCount,
        ],
        intrusion: data.intrusion,
        timestamps: [
          ...prevStats.timestamps.slice(-9),
          new Date().toLocaleTimeString(),
        ],
      }));
    });

    socket.on("active-clients", (data) => {
      setActiveClients(data);
    });

    return () => {
      socket.off("server-stats");
      socket.off("active-clients");
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
      },
    },
  };

  const cpuData = {
    labels: stats.timestamps,
    datasets: [
      {
        label: "CPU Usage (%)",
        data: stats.cpuUsage,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: true,
      },
    ],
  };

  const memoryData = {
    labels: stats.timestamps,
    datasets: [
      {
        label: "Memory Usage (%)",
        data: stats.memoryUsage,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const activeClientsData = {
    labels: stats.timestamps,
    datasets: [
      {
        label: "Active Clients Count",
        data: stats.activeClientsCount,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      {/* <h1>Welcome to Ayush's Server Monitor</h1> */}
      {stats.intrusion && (
        <div style={{color: "red", fontSize: "20px"}}>
          <strong>{stats.intrusion}</strong>
        </div>
      )}
      {/* Flex container for charts and table */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Charts Section */}
        <div style={{width: "60%", minWidth: "300px"}}>
          <div style={{height: "250px", marginBottom: "20px"}}>
            <h3>CPU Usage (%)</h3>
            <Line data={cpuData} options={chartOptions} />
          </div>
          <div style={{height: "250px", marginBottom: "20px"}}>
            <h3>Memory Usage (%)</h3>
            <Line data={memoryData} options={chartOptions} />
          </div>
          <div style={{height: "250px"}}>
            <h3>Active Clients Count</h3>
            <Line data={activeClientsData} options={chartOptions} />
          </div>
        </div>

        {/* Active Clients Table Section */}
        <div style={{width: "35%", minWidth: "250px"}}>
          <h2>Active Clients Details</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
            border="1"
          >
            <thead>
              <tr>
                <th>Socket ID</th>
                <th>IP Address</th>
                <th>Connected At</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(activeClients).map(([socketId, details]) => (
                <tr key={socketId}>
                  <td>{socketId}</td>
                  <td>{details.ip}</td>
                  <td>{details.connectedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServerStatsChart;
