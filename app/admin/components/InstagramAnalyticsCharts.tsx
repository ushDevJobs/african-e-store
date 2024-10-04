// components/InstagramAnalyticsCharts.tsx

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { InstagramPost } from '../utils/parseInstagramData';
import { useInstagramAnalytics } from '../../components/hooks/useInstagramAnalytics';

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface InstagramAnalyticsChartsProps {
  posts: InstagramPost[];
}

const InstagramAnalyticsCharts: React.FC<InstagramAnalyticsChartsProps> = ({ posts }) => {
  const analytics = useInstagramAnalytics(posts);

  // Engagement Over Time
  const engagementData = {
    labels: analytics.dates,
    datasets: [
      {
        label: 'Likes',
        data: analytics.likesCounts,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: false,
      },
      {
        label: 'Comments',
        data: analytics.commentsCounts,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        fill: false,
      },
    ],
  };

  // Top Posts by Engagement
  const topPostsData = {
    labels: analytics.topPosts.map((post) => post.caption.slice(0, 20) + '...'),
    datasets: [
      {
        label: 'Total Engagement',
        data: analytics.topPosts.map((post) => post.likes + post.comments),
        backgroundColor: '#f59e0b',
      },
    ],
  };

  // Hashtags Frequency
  const sortedHashtags = Object.entries(analytics.hashtagsFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 hashtags

  const hashtagsData = {
    labels: sortedHashtags.map(([tag]) => tag),
    datasets: [
      {
        label: 'Frequency',
        data: sortedHashtags.map(([, count]) => count),
        backgroundColor: '#8b5cf6',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Engagement Over Time */}
      <div className="bg-white shadow-lg rounded-lg p-6" style={{ maxHeight: '600px' }}>
        <h2 className="text-2xl font-semibold mb-4">Engagement Over Time</h2>
        <div style={{ height: '500px' }}>
          <Line data={engagementData} options={options} />
        </div>
      </div>

      {/* Top Posts by Engagement */}
      <div className="bg-white shadow-lg rounded-lg p-6" style={{ maxHeight: '600px' }}>
        <h2 className="text-2xl font-semibold mb-4">Top 5 Posts by Engagement</h2>
        <div style={{ height: '500px' }}>
          <Bar data={topPostsData} options={options} />
        </div>
      </div>

      {/* Hashtags Frequency */}
      <div className="bg-white shadow-lg rounded-lg p-6" style={{ maxHeight: '600px' }}>
        <h2 className="text-2xl font-semibold mb-4">Top 10 Hashtags</h2>
        <div style={{ height: '500px' }}>
          <Bar data={hashtagsData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default InstagramAnalyticsCharts;
