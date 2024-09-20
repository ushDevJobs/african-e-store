// components/SalesChart.tsx

import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  PieController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  BarElement,
  PieController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  productSalesDataByDate: any[];
  productSalesDataByCategory: any[];
}

const SalesChart: React.FC<ChartProps> = ({
  productSalesDataByDate,
  productSalesDataByCategory,
}) => {
  // Data for Sales Over Time
  const salesOverTimeData = {
    labels: productSalesDataByDate.map((pd) => pd.date),
    datasets: [
      {
        label: "Sales",
        data: productSalesDataByDate.map((pd) => pd.count),
        backgroundColor: "#10b981",
      },
    ],
  };

  // Data for Sales by Category
  const salesByCategoryData = {
    labels: productSalesDataByCategory.map((pd) => pd.name),
    datasets: [
      {
        label: "Sales by Category",
        data: productSalesDataByCategory.map((pd) => pd.products.length),
        backgroundColor: ["#3b82f6", "#f97316", "#10b981", "#e11d48"],
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
    maxHeight: "600px",
    height: "100%",
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Over Time Chart */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">Sales Over Time</h2>
          <div style={{ height: "400px" }}>
            <Bar data={salesOverTimeData} options={options} />
          </div>
        </div>

        {/* Sales by Product Category Chart */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Sales by Product Category
          </h2>
          <div style={{ height: "400px" }}>
            <Pie data={salesByCategoryData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
