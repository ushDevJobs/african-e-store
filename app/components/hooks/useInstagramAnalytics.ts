// hooks/useInstagramAnalytics.ts

import { useMemo } from "react";
import { InstagramPost } from "../../admin/utils/parseInstagramData";

interface InstagramAnalytics {
  dates: string[];
  likesCounts: number[];
  commentsCounts: number[];
  totalEngagements: number[];
  topPosts: InstagramPost[];
  hashtagsFrequency: { [key: string]: number };
}

export const useInstagramAnalytics = (
  posts: InstagramPost[]
): InstagramAnalytics => {
  const analytics = useMemo(() => {
    const dates: string[] = [];
    const likesCounts: number[] = [];
    const commentsCounts: number[] = [];
    const totalEngagements: number[] = [];
    const hashtagsFrequency: { [key: string]: number } = {};

    posts.forEach((post) => {
      // Dates
      dates.push(post.date);

      // Likes and Comments
      likesCounts.push(post.likes);
      commentsCounts.push(post.comments);
      totalEngagements.push(post.likes + post.comments);

      // Hashtags
      const hashtags = post.caption.match(/#\w+/g);
      if (hashtags) {
        hashtags.forEach((tag) => {
          hashtagsFrequency[tag] = (hashtagsFrequency[tag] || 0) + 1;
        });
      }
    });

    // Top Posts by Engagement
    const topPosts = [...posts]
      .sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
      .slice(0, 5);

    return {
      dates,
      likesCounts,
      commentsCounts,
      totalEngagements,
      topPosts,
      hashtagsFrequency,
    };
  }, [posts]);

  return analytics;
};
