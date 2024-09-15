// components/ActiveUsersChart.tsx

import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ActiveUsersChart: React.FC = () => {
  // Data for User Growth Over Time
  const userGrowthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Active Users",
        data: [200, 400, 600, 800],
        fill: false,
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
      },
    ],
  };

  // Data for User Engagement Over Time
  const userEngagementData = {
    labels: ["Emails", "Social Media", "Direct", "Referral"],
    datasets: [
      {
        label: "User Engagement",
        data: [300, 500, 200, 100],
        backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#e11d48"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const chartContainerStyle = {
    maxHeight: "500px",
    height: "100%",
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Over Time */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">User Growth Over Time</h2>
          <div style={{ height: "400px" }}>
            <Line data={userGrowthData} options={options} />
          </div>
        </div>

        {/* User Engagement by Source */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">
            User Engagement by Source
          </h2>
          <div style={{ height: "400px" }}>
            <Doughnut data={userEngagementData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersChart;
