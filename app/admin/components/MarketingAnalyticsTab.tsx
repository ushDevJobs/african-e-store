import { FetchSEOPPCFunction } from "@/app/api/apiClients";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';


const MarketingAnalyticsTab = () => {
  const [marketingData, setMarketingData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMarketingData = async () => {
      try {
        const response = await FetchSEOPPCFunction();
        // const data = await response.json(data);
        console.log(response.data.data);
        setMarketingData(response.data.data);
      } catch (error) {
        console.error("Error fetching marketing data:", error);
      }
    };

    fetchMarketingData();
  }, []);

  // Format the data to make the date readable
  const formattedData = marketingData.map((activity) => ({
    ...activity,
    date: new Date(activity.date).toLocaleDateString(), // Format date for display
  }));

  return (
    <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">Marketing Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clicks" stroke="#8884d8" name="Clicks" />
          <Line type="monotone" dataKey="impressions" stroke="#82ca9d" name="Impressions" />
          <Line type="monotone" dataKey="conversions" stroke="#ffc658" name="Conversions" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketingAnalyticsTab;
