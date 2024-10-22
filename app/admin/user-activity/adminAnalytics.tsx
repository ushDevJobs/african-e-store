import { useEffect, useState } from 'react';
import { fetchMetrics, fetchUserActivity, fetchTopRatedProducts, fetchTopViewedProducts, fetchRatingBreakdown, fetchRecentReviews } from '../../api/apiClients';
import LineChart from './components/Charts/LineChart';
import BarChart from './components/Charts/BarChart';
import PieChart from './components/Charts/PieChart';
import RecentReviewsTable from './components/RecentReviewsTable';

const AdminAnalyticsPage = () => {
  const [metrics, setMetrics] = useState({
    totalViews: 0,
    totalRatings: 0,
    totalReviews: 0,
    averageRating: 0,
  });
  const [activityData, setActivityData] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [topViewedProducts, setTopViewedProducts] = useState([]);
  const [ratingBreakdown, setRatingBreakdown] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const metricsData = await fetchMetrics();
      const activity = await fetchUserActivity();
      const topRated = await fetchTopRatedProducts();
      const topViewed = await fetchTopViewedProducts();
      const ratingsBreakdown = await fetchRatingBreakdown();
      const reviews = await fetchRecentReviews();

      // console.log(activity.activityOverTime.filter((actv) => actv.views <= 10));

      // console.log();
      setMetrics(metricsData);
      setActivityData(activity.activityOverTime);
      setTopRatedProducts(topRated.map(tr=> {return {...tr, averageRating: tr.averageRating.rating}}));
      setTopViewedProducts(topViewed);
      setRatingBreakdown(ratingsBreakdown);
      setRecentReviews(reviews);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Analytics</h1>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3>Total Views</h3>
          <p>{metrics.totalViews}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3>Total Ratings</h3>
          <p>{metrics.totalRatings}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3>Average Rating</h3>
          <p>{metrics.averageRating.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3>Total Reviews</h3>
          <p>{metrics.totalReviews}</p>
        </div>
      </div>

      {/* User Activity Over Time */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">User Activity Over Time</h2>
        <LineChart data={activityData} />
      </div>

      {/* Top Rated Products */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Top Rated Products</h2>
        <BarChart data={topRatedProducts} xKey="productName" yKey="averageRating" />
      </div>

      {/* Top Viewed Products */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Top Viewed Products</h2>
        <BarChart data={topViewedProducts} xKey="productName" yKey="viewCount" />
      </div>

      {/* Product Ratings Breakdown */}
      {/* <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Product Ratings Breakdown</h2>
        <PieChart data={ratingBreakdown} />
      </div> */}

      {/* Recent Reviews */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
        <RecentReviewsTable reviews={recentReviews} />
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
