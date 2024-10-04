import { useState, useEffect } from "react";

const MarketingAnalyticsTab = () => {
  const [marketingData, setMarketingData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMarketingData = async () => {
      try {
        const response = await fetch("/api/marketing");
        const data = await response.json();
        setMarketingData(data);
      } catch (error) {
        console.error("Error fetching marketing data:", error);
      }
    };

    // fetchMarketingData();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-4">Marketing Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketingData.map((activity, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-md font-semibold">{activity.type} Marketing</h3>
            <p>Clicks: {activity.clicks}</p>
            <p>Impressions: {activity.impressions}</p>
            <p>Conversions: {activity.conversions}</p>
            <p>Cost Per Click: ${activity.costPerClick.toFixed(2)}</p>
            <p>Open Rate: {activity.openRate}%</p>
            <p>Click Rate: {activity.clickRate}%</p>
            <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MarketingAnalyticsTab;