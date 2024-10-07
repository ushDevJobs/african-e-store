// hooks/useInstagramAnalytics.ts

import { useMemo } from "react";
import { InstagramPost } from "../../admin/utils/parseInstagramData";
import { format, addDays, differenceInDays } from "date-fns";

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

    if (posts.length === 0) {
      return {
        dates,
        likesCounts,
        commentsCounts,
        totalEngagements,
        topPosts: [],
        hashtagsFrequency,
      };
    }

    // Sort posts by date to ensure proper timeline processing
    const sortedPosts = [...posts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstPostDate = new Date(sortedPosts[0].date);
    const lastPostDate = new Date(sortedPosts[sortedPosts.length - 1].date);
    const today = new Date();

    // Start from the first post date, iterate until today
    for (let currentDate = firstPostDate; currentDate <= today; currentDate = addDays(currentDate, 1)) {
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      dates.push(formattedDate);

      const postForCurrentDate = sortedPosts.find(post => format(new Date(post.date), 'yyyy-MM-dd') === formattedDate);
      if (postForCurrentDate) {
        likesCounts.push(postForCurrentDate.likes);
        commentsCounts.push(postForCurrentDate.comments);
        totalEngagements.push(postForCurrentDate.likes + postForCurrentDate.comments);

        // Hashtags for current post
        const hashtags = postForCurrentDate.caption.match(/#\w+/g);
        if (hashtags) {
          hashtags.forEach((tag) => {
            hashtagsFrequency[tag] = (hashtagsFrequency[tag] || 0) + 1;
          });
        }
      } else {
        // No post for this date, push zero engagements
        likesCounts.push(0);
        commentsCounts.push(0);
        totalEngagements.push(0);
      }
    }

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
