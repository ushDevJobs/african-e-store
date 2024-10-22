import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

type PieChartProps = {
  data: Array<{ rating: number; percentage: number }>;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF3333"];

const PieChart: React.FC<any> = ({ data }) => (
  <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
    {/* <h2 className="text-lg font-bold mb-4">Marketing Analytics</h2> */}
    <ResponsiveContainer width="100%" height={500}>
      <RePieChart width={400} height={400}>
        <Pie
          dataKey="percentage"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RePieChart>
    </ResponsiveContainer>
  </div>
);

export default PieChart;
