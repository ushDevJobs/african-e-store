// hooks/useFacebookPosts.ts

import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {
  FacebookPostsResponse,
  PostData,
} from "../../components/models/IFBPosts";

export const useFacebookPosts = (initialUrl: string) => {
  const [postsData, setPostsData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // const apiKey = process.env.NEXT_PUBLIC_AXESSO_API_KEY;
  // const apiKey = "10db1c2b2amsh875c867f1e40ed2p1b5566jsnb3d89639df74";
  const apiKey = "70d1907ec9mshf7896c55ce9b256p11864djsnf91acaaa8a07";
  const apiEndpoint =
    "https://axesso-facebook-data-service.p.rapidapi.com/fba/facebook-lookup-posts";

  const MAX_POSTS = 2; // Set your desired limit

  const fetchPosts = useCallback(
    async (url: string) => {
      if (!apiKey) {
        console.error("API key is missing");
        setError("API key is missing");
        return;
      }

      if (postsData.length >= MAX_POSTS) {
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get<FacebookPostsResponse>(apiEndpoint, {
          headers: {
            // 'axesso-api-key': apiKey,
            "Content-Type": "application/json",
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "axesso-facebook-data-service.p.rapidapi.com",
          },
          params: {
            url: url,
          },
        });

        if (response.data.responseStatus === "PRODUCT_FOUND_RESPONSE") {
          setPostsData((prevPosts) => [...prevPosts, ...response.data.posts]);

          if (response.data.nextUrl && postsData.length < MAX_POSTS) {
            await fetchPosts(response.data.nextUrl);
          }
        } else {
          setError(response.data.responseMessage);
        }
      } catch (err: any) {
        console.error("Error fetching Facebook posts:", err);
        setError("Failed to fetch Facebook posts");
      } finally {
        setLoading(false);
      }
    },
    [apiKey, postsData.length]
  );

  // Fetch all posts on initial load
  useEffect(() => {
    if (initialUrl) {
      fetchPosts(initialUrl);
    }
  }, [initialUrl, fetchPosts]);

  // Memoize the posts data
  const memoizedPostsData = useMemo(() => postsData, [postsData]);

  return { postsData: memoizedPostsData, loading, error };
};
