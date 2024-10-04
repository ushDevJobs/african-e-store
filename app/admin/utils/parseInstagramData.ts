// utils/parseInstagramData.ts

export interface InstagramPost {
  likes: number;
  username: string;
  caption: string;
  comments: number;
  date: string;
}

export const parseInstagramData = (data: string): InstagramPost[] => {
  const posts = data
    .split("---")
    .map((block) => block.trim())
    .filter(Boolean);
  const parsedPosts: InstagramPost[] = [];

  posts.forEach((postText) => {
    const lines = postText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let likes = 0;
    let username = "";
    let captionLines: string[] = [];
    let comments = 0;
    let date = "";

    // Parsing logic
    let i = 0;

    // Likes
    if (lines[i].endsWith("like") || lines[i].endsWith("likes")) {
      likes = parseInt(lines[i].split(" ")[0], 10) || 0;
      i++;
    }

    // Username
    if (lines[i]) {
      username = lines[i];
      i++;
    }

    // Caption
    while (
      lines[i] &&
      !lines[i].startsWith("View") &&
      !lines[i].match(/^\w+ \d{1,2}, \d{4}$/)
    ) {
      captionLines.push(lines[i]);
      i++;
    }
    const caption = captionLines.join(" ");

    // Comments
    if (lines[i]?.startsWith("View")) {
      const commentText = lines[i];
      const commentMatch = commentText.match(
        /View all (\d+) comments|View (\d+) comment/
      );
      if (commentMatch) {
        comments = parseInt(commentMatch[1] || commentMatch[2], 10) || 0;
      }
      i++;
    }

    // Date
    if (lines[i]) {
      date = lines[i];
      // Convert to a consistent format
      const parsedDate = new Date(date);
      date = parsedDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    }

    parsedPosts.push({
      likes,
      username,
      caption,
      comments,
      date,
    });
  });

  return parsedPosts;
};
