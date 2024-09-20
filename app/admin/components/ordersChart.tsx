// components/OrdersChart.tsx

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
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
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  productSalesDataByDate: any[];
}

const OrdersChart: React.FC<ChartProps> = ({ productSalesDataByDate }) => {
  // Orders Over Time Data
  const ordersData = {
    labels: productSalesDataByDate.map((pd) => pd.date),
    datasets: [
      {
        label: "Products per Order",
        data: productSalesDataByDate.map((pd) => pd.count),
        fill: false,
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
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
    <div
      className="bg-white shadow-lg rounded-lg p-6 mt-6"
      style={chartContainerStyle}
    >
      <h2 className="text-2xl font-semibold mb-4">Products per Order Over Time</h2>
      <div style={{ height: "400px" }}>
        <Line data={ordersData} options={options} />
      </div>
    </div>
  );
};

export default OrdersChart;
