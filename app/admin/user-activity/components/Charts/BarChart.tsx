import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type BarChartProps = {
  data: Array<{
    productName: string;
    averageRating: number;
    viewCount: number;
  }>;
  xKey: string;
  yKey: string;
};

const BarChart: React.FC<any> = ({ data, xKey, yKey }) => (
  <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
    {/* <h2 className="text-lg font-bold mb-4">Marketing Analytics</h2> */}
    <ResponsiveContainer width="100%" height={500}>
      <ReBarChart
        //   width={600} height={300}
        data={data}
      >
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar dataKey={yKey} fill="#8884d8" />
      </ReBarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChart;
