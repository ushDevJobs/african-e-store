// components/ProductCharts.tsx

import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  productSalesDataByCount: any[];
  productSalesDataByDate: any[];
  productDataByCount: any[];
  productDataByDate: any[];
}

const ProductCharts: React.FC<ChartProps> = ({
  productSalesDataByCount,
  productSalesDataByDate,
  productDataByCount,
  productDataByDate,
}) => {
  // Inventory Levels Data
  const inventoryData = {
    labels: productDataByDate.map((pd) => pd.date),
    datasets: [
      {
        label: "Inventory Levels",
        data: productDataByDate.map((pd) => pd.count),
        fill: false,
        backgroundColor: "#f97316",
        borderColor: "#f97316",
      },
    ],
  };

  // Product Views Data
  const productViewsData = {
    labels: productDataByCount.map((pd) => pd.name.split(" ").slice(0, 5)),
    datasets: [
      {
        label: "Views",
        data: productDataByCount.map((pd) => pd.views.length),
        backgroundColor: "#10b981",
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
    <div className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Levels Over Timet */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Inventory Levels Over Time
          </h2>
          <div style={{ height: "400px" }}>
            <Line data={inventoryData} options={options} />
          </div>
        </div>

        {/* Sales by Product Category Chart */}
        <div
          className="bg-white shadow-lg rounded-lg p-6"
          style={chartContainerStyle}
        >
          <h2 className="text-2xl font-semibold mb-4">Product Views</h2>
          <div style={{ height: "400px" }}>
            <Bar data={productViewsData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCharts;
