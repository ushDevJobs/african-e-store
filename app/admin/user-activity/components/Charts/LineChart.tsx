import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type LineChartProps = {
  data: Array<{
    time: string;
    views: number;
    ratings: number;
    reviews: number;
    // children: any;
  }>;
};

const LineChart: React.FC<any> = ({ data }) => (
  <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
    {/* <h2 className="text-lg font-bold mb-4">Marketing Analytics</h2> */}
    <ResponsiveContainer width="100%" height={500}>
      <ReLineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="views" stroke="#8884d8" />
        <Line type="monotone" dataKey="ratings" stroke="#82ca9d" />
        <Line type="monotone" dataKey="reviews" stroke="#ffc658" />
      </ReLineChart>
    </ResponsiveContainer>
  </div>
);

export default LineChart;
