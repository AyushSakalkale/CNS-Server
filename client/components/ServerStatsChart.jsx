import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {Line} from "react-chartjs-2";
import "chart.js/auto";

const socket = io("http://192.168.232.74:3000"); // Replace with your actual server IP

const ServerStatsChart = () => {
  const [stats, setStats] = useState({
    cpuUsage: [],
    memoryUsage: [],
    activeClients: [],
    intrusion: "",
    timestamps: [],
  });

  useEffect(() => {
    socket.on("server-stats", (data) => {
      setStats((prevStats) => ({
        cpuUsage: [...prevStats.cpuUsage.slice(-9), data.cpu],
        memoryUsage: [...prevStats.memoryUsage.slice(-9), data.memory],
        activeClients: [
          ...prevStats.activeClients.slice(-9),
          data.activeClients,
        ],
        intrusion: data.intrusion, // Show intrusion message
        timestamps: [
          ...prevStats.timestamps.slice(-9),
          new Date().toLocaleTimeString(),
        ],
      }));
    });

    return () => socket.off("server-stats");
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100, // Always scale between 0 and 100
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
        label: "Active Clients",
        data: stats.activeClients,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Server Load Charts</h2>
      {stats.intrusion && (
        <div style={{color: "red", fontSize: "100px"}}>
          <strong>{stats.intrusion}</strong>
        </div>
      )}
      <div style={{width: "80%", margin: "auto", height: "300px"}}>
        <h3>CPU Usage (%)</h3>
        <Line data={cpuData} options={chartOptions} />
        {/* 
        <h3>Memory Usage (%)</h3>
        <Line data={memoryData} options={chartOptions} /> */}

        <h3>Active Clients</h3>
        <Line data={activeClientsData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ServerStatsChart;
