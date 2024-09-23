// components/FBPostAnalytics.tsx

import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { PostData } from '../../components/models/IFBPosts';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface FBPostAnalyticsProps {
  postsData: PostData[];
}

const FBPostAnalytics: React.FC<FBPostAnalyticsProps> = ({ postsData }) => {
  // Process data for charts
  const dates = postsData.map((post) => new Date(post.date).toLocaleDateString());
  const reactionCounts = postsData.map(
    (post) => post.data?.result?.data?.feedback?.reaction_count?.count || 0
  );
  const commentCounts = postsData.map(
    (post) => post.data?.result?.data?.feedback?.comment_count?.total_count || 0
  );
  const shareCounts = postsData.map(
    (post) => post.data?.result?.data?.feedback?.share_count?.count || 0
  );

  // Engagement Over Time Data
  const engagementData = {
    labels: dates,
    datasets: [
      {
        label: 'Reactions',
        data: reactionCounts,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: false,
      },
      {
        label: 'Comments',
        data: commentCounts,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        fill: false,
      },
      {
        label: 'Shares',
        data: shareCounts,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        fill: false,
      },
    ],
  };

  // Top Posts by Engagement
  const topPosts = [...postsData]
    .map((post) => ({
      id: post.id,
      text: post.text,
      totalEngagement:
        (post.data?.result?.data?.feedback?.reaction_count?.count || 0) +
        (post.data?.result?.data?.feedback?.comment_count?.total_count || 0) +
        (post.data?.result?.data?.feedback?.share_count?.count || 0),
    }))
    .sort((a, b) => b.totalEngagement - a.totalEngagement)
    .slice(0, 5);

  const topPostsData = {
    labels: topPosts.map((post) => post.text.slice(0, 20) + '...'), // Truncate text for labels
    datasets: [
      {
        label: 'Total Engagement',
        data: topPosts.map((post) => post.totalEngagement),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  // Reactions Breakdown
  const reactionTypes = ['LIKE', 'LOVE', 'WOW', 'HAHA', 'SAD', 'ANGRY', 'CARE'];
  const reactionTypeCounts = reactionTypes.map((type) =>
    postsData.reduce((total, post) => {
      const reactions = post.data?.result?.data?.feedback?.top_reactions?.edges || [];
      const reaction = reactions.find((r) => r.node.reaction_type === type);
      return total + (reaction?.reaction_count || 0);
    }, 0)
  );

  const reactionsData = {
    labels: reactionTypes,
    datasets: [
      {
        label: 'Reactions',
        data: reactionTypeCounts,
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280', '#8b5cf6', '#f472b6'],
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

      {/* Reactions Breakdown */}
      <div className="bg-white shadow-lg rounded-lg p-6" style={{ maxHeight: '600px' }}>
        <h2 className="text-2xl font-semibold mb-4">Reactions Breakdown</h2>
        <div style={{ height: '500px' }}>
          <Doughnut data={reactionsData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default FBPostAnalytics;
