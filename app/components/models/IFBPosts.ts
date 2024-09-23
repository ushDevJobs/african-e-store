// types.ts

export interface PostData {
    text: string;
    date: string;
    id: string;
    imageUrlList: string[];
    data: any; // You can define this more specifically if needed
  }
  
  export interface FacebookPostsResponse {
    responseStatus: string;
    responseMessage: string;
    nextUrl: string;
    countPosts: number;
    pageId: string;
    posts: PostData[];
  }
  