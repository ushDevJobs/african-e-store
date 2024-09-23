// components/FBMarketingTab.tsx

import React from 'react';
import { useFacebookPosts } from '../../components/hooks/useFacebookPosts';
import { PostData } from '../../components/models/IFBPosts';
import FBPostAnalytics from './FBPostAnalytics';

const FBMarketingTab: React.FC = () => {
  const pageUrl = 'https://web.facebook.com/people/The-Rayvvin-Store/61551347613696/'; // Replace with the desired Facebook page URL
  const { postsData, loading, error } = useFacebookPosts(pageUrl);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Facebook Marketing Analytics</h2>

      {loading && <p>Loading posts...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {postsData && postsData.length > 0 && (
        <>
          {/* Analytics Charts */}
          <FBPostAnalytics postsData={postsData} />

          {/* Posts Listing */}
          <div className="space-y-6 mt-6">
            {postsData.map((post: PostData) => (
              <div key={post.id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{post.text}</h3>
                <p className="text-gray-600 mb-2">Date: {post.date}</p>
                {post.imageUrlList && post.imageUrlList.length > 0 && (
                  <div className="flex space-x-4 overflow-x-auto">
                    {post.imageUrlList.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Post Image ${index + 1}`}
                        className="w-64 h-64 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FBMarketingTab;
