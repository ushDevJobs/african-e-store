// components/HomeCharts.tsx

import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const HomeCharts: React.FC = () => {
  // Chart data remains the same...
  // Revenue Over Time Data
  const revenueData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 8000, 10000],
        fill: false,
        backgroundColor: "#e11d48",
        borderColor: "#e11d48",
      },
    ],
  };

  // Traffic Sources Data
  const trafficData = {
    labels: ["Organic", "Paid", "Referral", "Social"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [4000, 3000, 2000, 1000],
        backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#e11d48"],
      },
    ],
  };

  // Top Selling Products Data
  const topProductsData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Sales",
        data: [1000, 800, 600],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const chartContainerStyle = {
    maxHeight: "500px",
    height: "100%",
  };

  return (
    <div className="mt-6 space-y-6">
      {/* First Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Over Time */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">Revenue Over Time</h2>
          <div style={{ height: "400px" }}>
            <Line data={revenueData} options={options} />
          </div>
        </div>

        {/* Traffic Sources */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">Traffic Sources</h2>
          <div style={{ height: "400px" }}>
            <Pie data={trafficData} options={options} />
          </div>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">Top Selling Products</h2>
          <div style={{ height: "400px" }}>
            <Bar data={topProductsData} options={options} />
          </div>
        </div>

        {/* Additional Chart or Visual */}
        {/* Include another chart here if needed */}
      </div>
    </div>
  );
};

export default HomeCharts;
